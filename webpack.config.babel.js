const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackValidator = require('webpack-validator');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const InlinemanifestwebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return webpackValidator({
    context: resolve('src'),
    entry: {
      app: './app.js',
      vendor: ['./index.css', 'jquery']
    },
    output: {
      path: resolve('dist'),
      filename: 'bundle.[name].[chunkhash].js',
      publicPath: './',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
      ]
    },
    plugins: removeEmpty([
      ifProd(new InlinemanifestwebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
      }),
      new HtmlWebpackPlugin({
        filename: 'test.html',
        template: './test.html',
        inject: 'body'
      })
    ])
  });
};
