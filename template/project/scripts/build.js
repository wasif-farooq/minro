'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const config = webpackConfig(process.env.NODE_ENV || 'development');
const compiler = webpack(config);
compiler.run();