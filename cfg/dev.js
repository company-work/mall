'use strict';
let pagecfg = require('./page.config');
let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryArr = {};
var entryObj = pagecfg.entry;
for (var item in entryObj) {
  var cacheArr = [];
  cacheArr[0] = 'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port;
  cacheArr[1] = 'webpack/hot/dev-server';
  cacheArr[2] = entryObj[item];
  entryArr[item] = cacheArr;
}

let config = Object.assign({}, baseConfig, {
  entry: entryArr,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    /*new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../manifest.json')
    }),*/
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

pagecfg.html.forEach(function(item,index){
  config.plugins.push(item)
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
