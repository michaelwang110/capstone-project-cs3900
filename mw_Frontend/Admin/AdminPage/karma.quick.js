// For local testing:

var webpack = require('karma-webpack');

const configuration = {
  browsers: ['ChromeHeadless'], 
  singleRun: true, 
  frameworks: ['jasmine'], 
  files: [
    './Tests/Bundles/bundle.admin_tests.js',
  ],
  proxies: {
    '/Placeholder-Icon.png': 'Placeholder-Icon.png'
  },
  reporters: [ 'dots' ], 
  webpack: { 
    devtool: 'inline-source-map', 
  },
  webpackServer: {
    noInfo: true 
  },
  client: {
    captureConsole: true,
  }
};
module.exports = function (config) {
  config.set(configuration);
};