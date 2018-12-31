const path = require('path');
const webpack = require('webpack');
let externals = require('./app/package.json').dependencies;

module.exports = {
  externals: Object.keys(externals || {}),

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
