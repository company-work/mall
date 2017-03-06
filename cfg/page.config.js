var HtmlWebpackPlugin = require('html-webpack-plugin');
var pageMap = require('../src/map');
var path = require('path');


var asArr = {};
var htmlArr = [];
var pageMaps = pageMap;
for (var keys in pageMaps) {
  htmlArr.push(
    new HtmlWebpackPlugin({
      filename: keys + '.html',
      template: path.join(__dirname, "../src/routes", pageMaps[keys].src, pageMaps[keys].tpl),
      cache: false,
      chunks:[pageMaps[keys].src],
      minify: {
        removeComments: false,
        collapseWhitespace: false
      }
    })
  );

  asArr[keys] = path.join(__dirname, "../src/routes", pageMaps[keys].src, pageMaps[keys].src)
}


//配置html
module.exports.html = htmlArr;

//配置静态资源
module.exports.entry = asArr;
