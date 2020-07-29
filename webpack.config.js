require('dotenv').config()
const path = require("path");
const webpack = require("webpack");
//const autoprefixer = require('autoprefixer');
const WebpackMd5Hash = require("webpack-md5-hash")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
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
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      stats: {
        children: false
      },
      compress: true,
      hot: true,
      port: 3000
    },
    devtool: "source-map",
    target: 'web',
    resolve: {
      // helps resolve extensions in react
      extensions: ['.js', '.jsx', '.ts', '.tsx']
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
            path.resolve(__dirname, "node_modules", "react-spring"),
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
              cacheDirectory: true,
              cacheCompression: false
            }
          }]
        },
        // FOR BABEL TO TRANSPILE TYPESCRIPT CORRECTLY
        {
          test: /\.tsx?$/,
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules", "react-spring"),
          ],
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
        // {
        //   // for loading scss files
        //   test: /\.(scss)$/i,
        //   use: [
        //     'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         importLoaders: 1
        //       }
        //     },
        //     'sass-loader'
        //   ]
        // },
        {
          test: /\.less$/,
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
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          // for loading css files
          test: /\.(css)$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            }
          ]
        },
        {
          // for loading images/modules
          test: /\.(eot|woff|woff2|ttf)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              name: "[path][name].[hash].[ext]"
            }
          }
        },
        // for loading/compressing big images
        {
          test: /\.(gif|png|jpe?g|svg|webp)$/i,
          use: [
            'file-loader',
            'webp-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                name: "[path][name].[hash].[ext]",
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
        // { 
        //   enforce: "pre", 
        //   test: /\.js$/, 
        //   loader: "source-map-loader"
        // }
      ]
    },
    plugins: [
      // to keep dist folder clean on rebuild
      new CleanWebpackPlugin(),
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
      // for codesplitting chunks by component/route
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
