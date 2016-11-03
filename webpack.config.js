// var webpack = require('webpack');

module.exports = {
  entry: './client/src/app.js',
  output: {
    path: __dirname,
    filename: './client/dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};