// import
const html_webpack_plugin = require('html-webpack-plugin')

// get_server
const get_server = (serve) => {
  if (!serve) return {}
  serve ? (WEBPACK_SERVE = true) : ''

  return {
    devServer: {
      open: {
        app: {
          name: 'firefox',
          arguments: ['--new-window'],
        },
      },
      hot: false,
      port: 8080,
    },
  }
}

// exports
module.exports = ({ dev, serve }) => {
  return {
    // mode
    mode: dev ? 'development' : 'production',

    // target
    target: ['browserslist'],

    // devtool
    devtool: dev ? 'eval-source-map' : undefined,

    // devServer
    ...get_server(serve),

    // context
    context: __dirname + '/src',

    // entry
    entry: { app: './main.js' },

    // output
    output: {
      filename: '[name].bunddle.[contenthash].js',
      clean: true,
      path: __dirname + '/dist',
      assetModuleFilename: 'static/[name].[contenthash][ext]',
    },

    // plugins
    plugins: [
      new html_webpack_plugin({
        template: './index.html',
      }),
    ],

    // module
    module: {
      // rules
      rules: [
        // css
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader'],
        },

        // files
        // {
        //   test: /\.(png|jpg|svg|gif|ico)$/,
        //   type: 'asset/resource',
        // },
        // {
        //   test: /\.(ttf|woff|woff2|eot)$/,
        //   type: 'asset/resource',
        // },
      ],
    },

    // resolve
    resolve: {
      extensions: ['js', '...'],
    },
  }
}
