
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js',
    './src/index.html'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: __dirname + '/dist'
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:
        /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

    new MiniCssExtractPlugin({
      // Options
      similar to the same options in webpackOptions.output
      // both
      options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
