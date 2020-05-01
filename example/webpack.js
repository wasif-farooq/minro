const webpack = require('webpack');
const config = require('./webpack/webpack.config.production');
const { exec, execSync } = require('child_process');
let pid = false;

const compiler = webpack(config);

compiler.watch({
    aggregateTimeout: 300
}, (err, stats) => {

    if (pid) {
        pid.emit('exit');
    }

    pid = exec('node -v', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: '+stdout);
        console.log('Child Process STDERR: '+stderr);
    });

    pid.on('exit', function (code) {
        console.log('Child process exited with exit code '+code);
    });

})