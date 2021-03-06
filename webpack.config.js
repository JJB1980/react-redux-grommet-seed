const webpack = require('webpack') // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var config = {
  context: path.join(__dirname, './src'), // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.jsx',
    vendor: [
      'react'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    open: true, // to open the local server in browser
    contentBase: path.join(__dirname, './src')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src', '/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    process.env.ANALYSE ? new BundleAnalyzerPlugin() : () => {},
    // new HtmlWebpackPlugin({
    //   title: 'Caching'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new ExtractTextPlugin({
      filename: 'styles.[chunkhash].css',
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
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

module.exports = config
