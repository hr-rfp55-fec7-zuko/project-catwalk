var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
  plugins: [
    new CompressionPlugin({
    // filename: 'bundle.js',
    // include: /\/includes/,
    // algorithm: 'gzip',
  }),
  new ImageMinimizerPlugin({
    minimizerOptions: {
      // Lossless optimization with custom option
      // Feel free to experiment with options for better result for you
      plugins: [
        ["gifsicle", { interlaced: true }],
        ["jpegtran", { progressive: true }],
        ["optipng", { optimizationLevel: 5 }],
        // Svgo configuration here https://github.com/svg/svgo#configuration
        // [
        //   "svgo",
        //   {
        //     plugins: extendDefaultPlugins([
        //       {
        //         name: "removeViewBox",
        //         active: false,
        //       },
        //       {
        //         name: "addAttributesToSVGElement",
        //         params: {
        //           attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
        //         },
        //       },
        //     ]),
        //   },
        // ],
      ],
    },
  }),
],
};