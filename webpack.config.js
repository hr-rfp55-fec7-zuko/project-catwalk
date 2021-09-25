var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  // devtool: 'eval-source-map', // used to be, for development
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [new CompressionPlugin({
    // filename: 'bundle.js',
    // include: /\/includes/,
    // algorithm: 'gzip',
  })],
};