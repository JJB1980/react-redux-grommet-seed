const webpack = require('webpack') // eslint-disable-line
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.DedupePlugin(), // dedupe similar code
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
      , sourceMap: false
    }), // minify everything
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
  ]
})
