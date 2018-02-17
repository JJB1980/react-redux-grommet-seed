const webpack = require('webpack')
const path = require('path')

const environments = {
  development: {
    context: `${__dirname}/src`,
    devtool: 'source-map',
    entry: {
      javascript: './app.jsx',
      html: './index.html'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', 'scss']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.html$/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test: /(\.scss$)/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          options: {
            outputStyle: 'compressed',
            includePaths: ['./node_modules']
          }
        }
      ]
    },
    sassLoader: {
      includePaths: [
        path.resolve('./node_modules/grommet/node_modules')
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
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.html$/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
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
}

module.exports = environments[process.env.NODE_ENV] || environments.development
