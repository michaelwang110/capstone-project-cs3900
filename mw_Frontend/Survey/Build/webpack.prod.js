const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.survey.js');
const merge = require('webpack-merge');

module.exports = common.map(config => merge(config, {
  mode: "production",
  devtool: "source-map",  // includes filenames and structure for stack traces, but doesn't expose the code
}));