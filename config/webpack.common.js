const { resolve } = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeflag = _mode === 'production' ? true : false;

module.exports = {
  cache: {
    type: 'filesystem',
    // cacheDirectory: resolve(__dirname, '.temp'),
  },
  // performance: {
  //   maxAssetSize: 250000, // 最大资源大小250KB
  //   maxEntrypointSize: 250000, // 最大入口资源大小250KB
  //   hints: 'warning', // 超出限制时只给出警告
  // },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          /** 默认使用swc-loader */
          loader: argv.loader === 'babel' ? 'babel-loader' : 'swc-loader',
        }],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(css|less)$/i,
        include: [resolve(__dirname, '../src'), resolve(__dirname, '../node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            // 给css属性自动添加前缀
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {
                    autoprefixer: {}
                  }
                ]]
              },  
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
      // {
      //   resourceQuery: /raw-lingui/,
      //   type: 'javascript/auto',
      // },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    // splitChunks: {
    //   chunks: 'all',
    //   maxAsyncRequests: 3,
    //   cacheGroups: {},
    // },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
  ],
};
