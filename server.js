/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const chalk = require('chalk');


new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.port, config.host, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(chalk.blue(' # Access URLs:'));
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('     Local: ' + chalk.green('http://localhost:' + config.port))
    console.log('  External: ' + chalk.green('http://' + config.host + ':' + config.port))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('');

    //open('http://' + config.host + ':' + config.port + '/webpack-dev-server/');
    open('http://' + config.host + ':' + config.port);
  });
