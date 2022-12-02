const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackBaseConfig = require('./config/webpack.common');
if (argv.analyze) webpackBaseConfig.plugins.concat([new BundleAnalyzerPlugin()])

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
