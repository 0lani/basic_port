module.exports =  {
  "presets": [
    // Set preset for react env
    "@babel/preset-react",
    [
      // Preset env for babel w/ options
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "browsers": [
            "> 5%",
            "last 1 Chrome version"
          ],
          "node": "current"
        },
        "modules": false,
        "loose": false
      }
    ]
  ],
  "plugins": [
    // For hot reloading dev server and keep state
    "react-hot-loader/babel",
    // Enables use of import
    "@babel/syntax-dynamic-import",
    // Enables use of spread operater
    "@babel/plugin-proposal-object-rest-spread",
    // Enables common js modules
    "@babel/plugin-transform-modules-commonjs",
    [
      // for antd components
      "@babel/plugin-proposal-decorators", 
      { 
        "legacy": true 
      }
    ],
    [
      // Enables use of hoc
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      // for antd styling
      "import", {
        "libraryName": "antd", 
        "libraryDirectory": "es", 
        "style": "css"
      }
    ],
    [
      "import", {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "es/icons",
        "camel2DashComponentName": false
     },
      "@ant-design/icons"
    ],
    ["prismjs", {
      "languages": ["javascript", "js"],
      "plugins": ["line-numbers"],
      "theme": "twilight",
      "css": true
      }
    ],
    [
      "module-resolver",
      {
        "root": [
          "./"
        ],
        "alias": {
          "@Assets": "./src/resources",
          "@Less": "./src/resources/less",
          "@Images": "./src/resources/images",
          "@Icons": "./src/resources/icons",
          "@Components": "./src/Components",
          "@HomePage": "./src/Components/HomePageLayout",
          "@SitePage": "./src/Components/SitePagesLayout",
          "@Parallax": "./src/Components/ParallaxWrapper",
        }
      }
    ]
    // [
    //   // Brings in polyfills for es6+
    //   "@babel/plugin-transform-runtime",
    //   {
    //     "corejs": 3,
    //     "regenerator": true
    //   }
    // ],
    // [ // Reduces bundle size for material ui
    //   "babel-plugin-import",
    //   {
    //     "libraryName": "@material-ui/core",
    //     "camel2DashComponentName": false
    //   },
    //   "core"
    // ],
    // [ // Reduces bundle size for material ui
    //   "babel-plugin-import",
    //   {
    //     "libraryName": "@material-ui/icons",
    //     "camel2DashComponentName": false
    //   },
    //   "icons"
    // ],
    // [
    //   "babel-plugin-styled-components",
    //   {
    //     "ssr": true,
    //     "displayName": true,
    //     "fileName": true,
    //     "minify": true,
    //     "transpileTemplateLiterals": true,
    //     "pure": true
    //   }
    // ],
  ]
}