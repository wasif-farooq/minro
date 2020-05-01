const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: {
        'index': './src/index.js',
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
        concatenateModules: false,
        namedModules: true,
        nodeEnv: 'development',
        usedExports: true,
        concatenateModules: true
    },
    target: 'node',
    devtool: 'source-map',
    node: {
        global: false,
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    plugins: []
}
