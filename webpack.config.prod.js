const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map', // bundle.js.map
  entry: {
    // 指定最先讀的檔案 index.js server最先讀的 client web最先讀的
    bundle: ['babel-polyfill', './src/clients/'],
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(), // 排序輸出
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
