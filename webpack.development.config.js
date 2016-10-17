const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './app/index'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),  
    publicPath: '/', 
  },
  // This plugin activates hot loading
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx|json)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader/webpack', 'babel'],
      }, 
      {
        test: /\.css?$/,
        loader: 'style!css' // This are the loaders
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};