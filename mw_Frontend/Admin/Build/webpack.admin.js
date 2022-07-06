const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

const adminBundleOutputDir = '../wwwroot/Admin';
const testAdminPageOutputDir = './Admin/AdminPage/Tests/Bundles';
const testAuthoringDialogOutputDir = './Admin/AuthoringDialog/Tests/Bundles';

module.exports = [{
    entry: './Admin/Index.tsx',
    mode: 'production',
    output: {
        filename: 'bundle.admin.js',
        path: path.resolve(adminBundleOutputDir),
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: 'less-loader',
            }
        ],
    },
},
{
    entry: './Admin/AdminPage/Tests/tests.ts',
    mode: 'production',
    output: {
        filename: 'bundle.admin_tests.js',
        path: path.resolve(testAdminPageOutputDir),
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: 'less-loader',
            }
        ],
    },
},
{
    entry: './Admin/AuthoringDialog/Tests/tests.ts',
    mode: 'production',
    output: {
        filename: 'bundle.authoring_tests.js',
        path: path.resolve(testAuthoringDialogOutputDir),
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: 'less-loader',
            }
        ],
    },
}
];