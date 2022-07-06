const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

const surveyBundleOutputDir = '../wwwroot';
const testSurveyOutputDir = './Survey/Tests/Bundles';

module.exports = [{
    entry: './Survey/Index.tsx',
    mode: 'production',
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(surveyBundleOutputDir),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules:  [
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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ],
    },
},
{
    entry: './Survey/Tests/tests.ts',
    mode: 'production',
    output: {
        filename: 'bundle.tests.js',
        path: path.resolve(testSurveyOutputDir),
    },
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
];