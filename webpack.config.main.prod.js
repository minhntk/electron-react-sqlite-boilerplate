const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const port = process.env.PORT || 3000;

module.exports = merge.smart(baseConfig, {
  entry: './app/index.js',

  mode: 'production',

  target: 'electron-renderer',

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/',
    filename: 'main.prod.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000000'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
});