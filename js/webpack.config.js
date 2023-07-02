const html_webpack_plugin = require('html-webpack-plugin')

// sandboxes

const { sandboxes } = require('./sandboxes.json')

const create_html_webpack_plugins = () => {
  return sandboxes.reduce((plugins, sandbox) => {
    plugins.push(
      new html_webpack_plugin({
        filename: `${sandbox}.html`,
        chunks: [sandbox],
        template: __dirname + `/src/${sandbox}/${sandbox}.html`,
      })
    )
    return plugins
  }, [])
}

const create_entry = () => {
  return sandboxes.reduce((entry, sandbox) => {
    entry[sandbox] = __dirname + `/src/${sandbox}/${sandbox}`
    return entry
  }, {})
}

//
// exports
//

module.exports = (dev, serve) => ({
  // mode
  mode: dev ? 'development' : 'production',

  // entry
  entry: create_entry(),

  // output
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    clean: true,
    assetModuleFilename: '[name][contenthash][ext]',
  },

  // devServer
  devServer: serve
    ? {
        open: {
          app: {
            name: 'safari',
            arguments: ['--new-tab'],
          },
        },
        hot: true,
        port: 8080,
      }
    : undefined,

  // target
  target: ['browserslist'],

  // devtool
  devtool: dev ? 'eval-source-map' : undefined,

  // resolve
  resolve: {
    alias: {
      // assets
      '@assets': __dirname + '/src/form_builder/assets/_assets',
    },
  },

  // module
  module: {
    rules: [
      // js
      {
        test: /\.(mjs|js)$/i,
        exclude: /(node_modules)/,

        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },

      // css
      {
        test: /\.sass$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: dev ? true : false,
            },
          },
        ],
      },
    ],
  },

  //plugins
  plugins: [...create_html_webpack_plugins()],
})
