const merge = require('webpack-merge');
const commonConfig = require('../../config/webpack.common');
module.exports = merge.default(commonConfig, {
  entry: {
    server: [
        './src/index.ts',
    ],
  },
  resolve: {
    mainFiles: ['index'],
    alias: {},
    extensions: ['.js', '.ts', '.tsx', 'jsx', '.css'],
  },
  output: {
    filename: '[name].js',
  },
});