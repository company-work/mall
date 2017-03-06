'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');

let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  host: defaultSettings.host,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/assets'),
    //publicPath: defaultSettings.publicPath
    chunkFilename: "[name].js"
  },
  devServer: {
    inline: true,
    quiet: true,
    color: true,
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      public:`${defaultSettings.srcPath}/public/`,
      components: `${defaultSettings.srcPath}/components/`
    }
  },
  module: {},
  postcss: function () {
    return [
      require('precss'),
      require('autoprefixer'),
      px2rem({remUnit: 64})
    ];
  }
};
