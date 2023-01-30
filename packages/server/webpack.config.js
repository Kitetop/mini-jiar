module.exports = {
  entry: {
    server: [
        './src/index.ts',
    ],
  },
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.ts', '.tsx', 'jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          /** 默认使用swc-loader */
          loader: 'swc-loader',
        }],
      },
    ]
  },
  output: {
    filename: '[name].js',
  },
};