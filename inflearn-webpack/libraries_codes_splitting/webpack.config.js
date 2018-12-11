var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var path = require('path');

module.exports = {
  mode: "development",
  entry: {
    main: './app/index.js',
    vendor: [
      'moment',
      'lodash'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    }
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: './dist/'
    })
  ]
}
