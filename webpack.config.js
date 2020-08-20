require('dotenv').config()
const path = require("path");
const webpack = require("webpack");
//const autoprefixer = require('autoprefixer');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");



// quickly decides which mode were in based on node env then destructures into object
module.exports = ({ mode } = {
  mode: process.env.NODE_ENV === "production" ?
    "production"
    :
    "development"
}) => {
  // puts current mode into variable
  const isProduction = (mode === "production");
  // webpackmerge will help decide between our prod/dev configs on build and overwrite the correct one
  return {
    // sets mode for current env
    mode,
    // checks for entry for webapck
    entry: {
      main: path.join(__dirname, 'src', 'index.js'),
    },
    // output for bundled file
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "index.[hash].js"
    },
    // devServer: {
    //   contentBase: path.resolve(__dirname, 'dist'),
    //   stats: {
    //     children: false
    //   },
    //   compress: true,
    //   hot: true,
    //   port: 3000
    // },
    devtool: "none",
    target: 'web',
    resolve: {
      alias: {
        "@ant-design/icons$": path.resolve(__dirname, "./src/resources/icons/index.js"),
        "~": path.resolve(__dirname, "./src"),
      },
      // helps resolve extensions in react
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.less']
    },
    optimization: {
      namedModules: true,
      chunkIds: 'size',
      moduleIds: 'hashed',
      removeAvailableModules: true, 
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      usedExports: true,
      minimize: true,
      minimizer: [new TerserWebpackPlugin({
         exclude: /node_modules/,
         extractComments: false,
         sourceMap: true,
         terserOptions: {
            output: {
               comments: true,
               beautify: true,
            },
            ecma: 6,
            warnings: false,
            parse: {},
            mangle: {
               eval: true, 
               // mangle options
               keep_classnames: false,
               keep_fnames: false,
               module: true,
               toplevel: true,
               safari10: false,
            },
            nameCache: null,
            ie8: false,
         }
      })]},
    module: {
      rules: [
        {
          // FOR BABEL TO TRANSPILE JAVASCRIPT CORRECTLY
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules", "antd"),
            path.resolve(__dirname, "node_modules", "react-spring")
          ],
          use: [{
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": {
                    "node": "12"
                  }
                }], '@babel/preset-react'
              ],
              plugins: [
                [
                  'import', { 
                    libraryName: "antd", 
                    libraryDirectory: "es", 
                    style: true 
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false
            }
          }]
        },
        // FOR BABEL TO TRANSPILE TYPESCRIPT CORRECTLY
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          // for loading html files
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]

        },
        // for loading antd less files/modifying them
        {
          test: /antd.*\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true
              }
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  modifyVars: {// DEFAULTS FOR ANT DESIGN
                    "layout-header-background": `#0e2339`,
                    "layout-body-background": `80a1ea42`,
                    "primary-color": `#1890ff`,
                    "link-color": `#f5222d`,
                    "success-color": `#52c41a`,
                    "warning-color": `#faad14`,
                    "error-color": `#f5222d`,
                    "font-size-base": `13px`,
                    "heading-color": `rgba(0, 0, 0, .85)`,
                    "text-color": `#fff`,
                    "text-color-secondary": `rgba(0, 0, 0, .45)`,
                    "disabled-color": `rgba(0, 0, 0, .25)`,
                    "border-radius-base": `4px`,
                    "border-color-base": `#d9d9d9`,
                    "box-shadow-base": `0 2px 8px rgba(0, 0, 0, .15)`
                  },
                },
              }
            }
          ]
        },
        { // for loading less files
          test: /\.less$/,
          exclude: /antd.*/,
          use: [
            MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", 
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              }
            }
          ],
        },
        {
          // for loading css files
          test: /\.(css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", "postcss-loader",
            ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          // for loading smaller modules
          test: /\.(eot|woff|woff2|ttf)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              name: "assets/[hash].[ext]"
            }
          }
        },
        // for loading/compressing images
        {
          test: /\.(gif|png|jpe?g|webp)$/i,
          use: [
            'file-loader',
            'webp-loader', // comment for local dev
            {
              loader: 'image-webpack-loader',
              options: {
                name: "assets/[hash].[ext]",
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                },
              }
            },
          ],
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        }
      ]
    },
    plugins: [
      // to keep dist folder clean on rebuild
      new CleanWebpackPlugin(),
      // forces dev server to write bundles files to disk but still uses memory
      new WriteFilePlugin(),
      // for html files
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: path.resolve(__dirname, "public", "index.html"),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      // copies files/folders to public folder  
     new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, "public"), to: path.resolve(__dirname, "dist") },
        ]
      }),
      // CSS file to watch and rebuild on every change.
      new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "styles.css"
      }),
      // reduces css duplication in bundle
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default',
            {
              discardComments:
              {
                removeAll: true
              }
            }],
        },
        canPrint: true
      }),
      // for codesplitting chunks by component/route on ssr
      // new ReactLoadablePlugin({
      //   filename: './dist/react-loadable.json',
      // }),
      // to create manifest.json on build
      new WebpackManifestPlugin(),
      // took keep state on reload in dev server 
      new webpack.HotModuleReplacementPlugin(),
      // for hashing
      new WebpackMd5Hash()
    ]
  };
};
