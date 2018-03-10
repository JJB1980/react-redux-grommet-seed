const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.jsx'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(js|jsx)$/, // Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ 'babel-preset-es2015' ].map(require.resolve)
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader?includePaths[]=' + (path.resolve('./node_modules')) +
              '&includePaths[]=' + path.resolve('./node_modules/grommet/node_modules')
        ])
      }
    ]
  }

}
