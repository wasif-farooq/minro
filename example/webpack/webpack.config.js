const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const EmitAllPlugin = require('./emit');


module.exports = {
  mode: 'development',
  entry: {
    'index': './src/cluster.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        //exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false,
      concatenateModules: false
  },

  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  plugins: [
    new NodemonPlugin({
        nodeArgs: ['--require=source-map-support/register'],
    }),
   new EmitAllPlugin({
      ignorePattern: /node_modules/, // default,
      path: path.join(__dirname, '..', 'build') // defaults to `output.path`
    })
  ]
}
