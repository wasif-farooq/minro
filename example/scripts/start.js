'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');
const { spawn } = require('child_process');
const paths = require('../config/paths');
//const config = webpackConfig(process.env.NODE_ENV || 'development');
let thread = false;

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

thread = spawn('node', [paths.appBuild + '/index.js'], {
    detached: true
    //stdio: [ 'ignore', out, err ]
});
process.exit(0);
/*thread.stdout.on('data', data => console.log(data.toString()));
thread.stdout.on('message', data => console.log(data.toString()));
thread.stderr.on('data', data => console.warn(data.toString()));
*/