'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api/*': {
            target: 'http://localhost:3030',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
    },

    host: '192.168.43.232',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    useEslint: false,
    showEslintErrorsInOverlay: false,

    devtool: 'eval-source-map',

    cacheBusting: true,

    cssSourceMap: false,
  },

  build: {
    index: path.resolve(__dirname, '../dist/www/index.html'),

    assetsRoot: path.resolve(__dirname, '../dist/www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionSourceMap: true,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report
  }
}