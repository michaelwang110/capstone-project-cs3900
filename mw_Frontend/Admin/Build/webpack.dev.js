const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.admin.js');
const merge = require('webpack-merge');

module.exports = common.map(config => merge(config, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",

    module: {
        rules:  [
            {
                test: /\.(ts|tsx)$/,
                loader: 'string-replace-loader',
                options: {
                    search: `API_URL = '.*'`,
                    replace: `API_URL = 'https://localhost:5001'`,
                    flags: 'g',
                }
            }
        ]
    }
}));