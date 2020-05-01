'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('../config/env');

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const { exec, execSync, spawn } = require('child_process');
const config = webpackConfig(process.env.NODE_ENV || 'development');
let thread = false;
const compiler = webpack(config);

compiler.watch({
    aggregateTimeout: 1000
}, (err, stats) => {

    if (thread) {
        thread.stdin.pause();
        thread.kill();
    }

    process.on('unhandledRejection', err => {
        thread.stdin.pause();
        thread.kill();
        throw err;
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
            thread.stdin.pause();
            thread.kill();
            process.exit();
        });
    });

    setTimeout(() => {
        thread = spawn('node', [config.output.path + '/index.js']);
        thread.stdout.on('data', data => console.log(data.toString()));
        thread.stdout.on('message', data => console.log(data.toString()));
        thread.stderr.on('data', data => console.warn(data.toString()));
    }, 500);

})