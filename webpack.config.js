const { resolve } = require('path');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackBaseConfig = require('./config/webpack.common');
if (argv.analyze) webpackBaseConfig.plugins.concat([new BundleAnalyzerPlugin()])

module.exports = merge.default(webpackBaseConfig, _mergeConfig, {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    // fallback: { url: false, os: false },
    mainFiles: ['index'],
    alias: {
      'context': resolve('src/context'),
      'hooks': resolve('src/hooks'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components'),
      'lib': resolve('src/lib'),
    },

    extensions: ['.js', '.ts', '.tsx', 'jsx', '.css'],
  },
  plugins: [
    new Dotenv({
      path: resolve(`config/.env.${_mode}`)
    }),
  ]
});
