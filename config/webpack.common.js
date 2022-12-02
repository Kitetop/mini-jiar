const { resolve } = require('path');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeflag = _mode === 'production' ? true : false;

module.exports = {
  entry: {
    main: resolve('src/web/index.tsx'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
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
        test: /\.css$/i,
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
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
  resolve: {
    // fallback: { url: false, os: false },
    mainFiles: ['index'],
    alias: {
      'core': resolve('src/core'),
      'server': resolve('src/server'),
      'hooks': resolve('src/hooks'),
      '@web': resolve('src/web'),
      '@pages': resolve('src/web/pages'),
    },

    extensions: ['.js', '.ts', '.tsx', 'jsx', '.css'],
  },
  plugins: [
    // new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new Dotenv({
      path: resolve(`config/.env.${_mode}`)
    }),
  ],
};
