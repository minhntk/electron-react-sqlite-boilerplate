const path = require('path');
module.exports = {
  entry: ['babel-polyfill', './app/electron-starter.js'],
  target: 'electron-main',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './app'),
    filename: 'electron.starter.prod.js'
  },
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
};