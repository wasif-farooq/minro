const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  mode: 'development',
  entry: {
    'index': './tests/index.test.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'test'),
    publicPath: '/',
    filename: '[name].test.js'
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false,
  },

  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()]
}
