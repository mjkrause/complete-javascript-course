const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './starter/src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'starter/dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'starter/dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './starter/src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
