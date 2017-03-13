'use strict';
let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
let pagecfg = require('./page.config');

var entryArr = {};
var entryObj = pagecfg.entry;
/*
console.log(entryObj);
for (var item in entryObj) {
  entryArr[item] = path.join(__dirname, '../src/routes',entryArr[item]);
}
*/


let config = Object.assign({}, baseConfig, {
  entry: entryObj,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../manifest.json')
    })
  ],
  module: defaultSettings.getDefaultModules()
});

pagecfg.html.forEach(function(item,index){
  config.plugins.push(item)
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
