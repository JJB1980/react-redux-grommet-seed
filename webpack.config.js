const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const environments = {
  development: {
    context: `${__dirname}/src`,
    devtool: 'source-map',
    entry: {
      javascript: './app.js',
      html: './index.html'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.html$/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
        }
      ]
    },
    output: {
      filename: 'app.js',
      path: `${__dirname}/dist`
    },
    devServer: {
      port: 9000
    }
  },

  production: {
    context: `${__dirname}/src`,
    entry: {
      javascript: './app.js',
      html: './index.html'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['babel']
        },
        {
          test: /\.html$/,
          loader: 'file?name=[name].[ext]'
        },
        ,
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
    output: {
      filename: 'app.js',
      path: `${__dirname}/dist`
    }
  }
};

module.exports = environments[process.env.NODE_ENV] || environments.development;
