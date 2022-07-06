// For local testing:

var webpack = require('karma-webpack');

const configuration = {
  browsers: ['ChromeHeadless'], 
  singleRun: true, 
  frameworks: ['jasmine'], 
  files: [
    './Tests/Bundles/bundle.authoring_tests.js'
  ],
  reporters: [ 'dots' ], 
  webpack: { 
    devtool: 'inline-source-map', 
  },
  proxies: {
    '/Placeholder-Icon.png': 'Placeholder-Icon.png'
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