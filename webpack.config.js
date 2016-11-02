const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'       
  },
  // This plugin activates hot loading
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
      , {
        test: /\.css?$/,
        loader: 'style!css' // This are the loaders
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};