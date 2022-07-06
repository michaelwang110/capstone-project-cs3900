// For CI testing:

var webpack = require('karma-webpack');
const configuration = {
  // global config of your BrowserStack account
  browserStack: {
    username: 'numbersinternati1',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY
  },

  // NOTE: necessary for safari and ios testing because they hate localhost
  // bs-local.com is the alias browserstack uses to get around this
  hostname: 'bs-local.com',

  // define browsers
  customLaunchers: {
    bs_chrome: {
      base: 'BrowserStack',
      browser: 'chrome',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10'
    },
    bs_firefox: {
      base: 'BrowserStack',
      browser: 'firefox',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10'
    },
    bs_edge: {
      base: 'BrowserStack',
      browser: 'edge',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10'
    },
    bs_ie: {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10'
    },
    bs_safari: {
      base: 'BrowserStack',
      browser: 'safari',
      browser_version: 'latest',
      os: 'OS X',
      os_version: 'Catalina'
    },
    bs_ios: {
      base: 'BrowserStack',
      browser: 'iphone',
      device: 'iPhone XS',
      real_mobile: 'true',
      os: 'ios',
      os_version: '12'
    },
    bs_android: {
      base: 'BrowserStack',
      browser: 'android',
      device: 'Google Pixel 4',
      real_mobile: 'true',
      os: 'android',
      os_version: '10.0'
    }
  },
  singleRun: true, 
  frameworks: ['jasmine'], 
  files: [
    './Tests/Bundles/bundle.authoring_tests.js',
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
  },
  browsers: ['bs_ie', 'bs_chrome', 'bs_firefox', 'bs_edge', 'bs_edge', 'bs_safari', 'bs_ios', 'bs_android']
}

module.exports = function (config) {
  config.set(configuration);
};