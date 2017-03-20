'use strict';
let path = require('path');
let webpack = require('webpack');


module.exports = {
  entry: {
    'plugins': [
      'react',
      'react-dom',
      './src/public/libs/APP.js',
      './src/public/libs/swiper/swiper.min.js',
      './src/public/libs/swiper/swiper.min.css'
    ]
  },


  output: {
    path: path.join(__dirname, '../dist/assets'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {test: /\.(ttf)$/, loader: "url-loader?name=/[path][name].[ext]"},
      {
        test: /\.(png|jpeg|gif|jpg)$/,
        loader: ['url'],
        query: {
          limit: 1,
          name: "/[path][name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_library',
      context: __dirname
    })
  ]
};
