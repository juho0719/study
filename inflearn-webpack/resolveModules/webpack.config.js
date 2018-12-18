var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};