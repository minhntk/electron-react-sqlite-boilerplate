/* eslint global-require: 0, no-console: 0 */

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');


const dll = path.resolve(process.cwd(), 'dll');
const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/dist`;
const manifest = path.resolve(dll, 'vendor.json');


if (!(fs.existsSync(dll) && fs.existsSync(manifest))) {
  console.log(chalk.black.bgYellow.bold(
    'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
  ));
  execSync('npm run build-dll');
}


module.exports = merge.smart(baseConfig, {

  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-renderer',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/index.js'),
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
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
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifest),
      sourceType: 'var'
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.HotModuleReplacementPlugin({
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    }),

    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
  ],

  devServer: {
    port,
    publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    after() {
      if (process.env.NODE_ENV === 'development') {
        spawn(
          'npm',
          ['run', 'start-electron-dev'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  },
});