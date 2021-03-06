/* global __dirname */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    docs: './src',
  },

  output: {
    path: __dirname,
    filename: '[name].js',
  },

  externals: {
    'c3': 'c3',
    'vue-router': 'VueRouter',
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /\/dist\/|\/node_modules\/|\.sample\.js$/,
    }, {
      test: /\.html?$|\.sample\.js$/,
      loader: {
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
    }]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-patternfly$': path.resolve('../dist/vue-patternfly.js'),
    }
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
};
