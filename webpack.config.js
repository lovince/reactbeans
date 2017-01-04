var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel-loader' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
      // { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]') },
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      index: 'index.html',
      template: 'src/index.html',
      css: 'styles.css'
    })
  ]
};

module.exports = config;
