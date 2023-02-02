const { join, resolve } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');
const webpack = require('webpack');

const prot = 4500;

module.exports = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:' + prot,
    },
    static: {
      directory: join(__dirname, '../public'),
    },
    hot: true,
    port: prot,
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },
  stats: 'errors-only',
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-generator',
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + prot],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        // console.log(error);
        notifier.notify({
          title: '👒 Webpack构建失败',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    }),
    new webpack.SourceMapDevToolPlugin({ exclude: '/node_modules/*' }),
  ],
};
