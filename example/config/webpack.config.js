const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');
    const env = getClientEnvironment(paths.dotenv.slice(0, -1));

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        bail: isEnvProduction,
        target: 'node',
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'source-map',
        entry: {
            'index': paths.appIndexJs,
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: isEnvProduction,
                        }
                    },
                    include: paths.appSrc,
                }
            ]
        },
        output: {
            path: isEnvProduction ? paths.appBuild : paths.appTemp,
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction
                ? '[name].js'
                : isEnvDevelopment && 'index.js',
            publicPath: paths.publicUrlOrPath,
            globalObject: 'global',
            futureEmitAssets: true,
            chunkFilename: isEnvProduction
                ? '[name].js'
                : isEnvDevelopment && '[name].js',
        },
        optimization: {
            // We no not want to minimize our code.
            minimize: isEnvProduction,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        keep_classnames: isEnvProductionProfile,
                        keep_fnames: isEnvProductionProfile,
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    sourceMap: shouldUseSourceMap,
                })
            ],
            concatenateModules: false,
            namedModules: true,
            nodeEnv: 'development',
            usedExports: true,
            concatenateModules: true
        },
        node: {
            global: false,
            __dirname: false,
            __filename: false,
        },
        resolve: {
            modules: ['node_modules', paths.appNodeModules].concat(
                []
            ),
            extensions: paths.moduleFileExtensions.map(ext => `.${ext}`)
        },
        externals: [nodeExternals()],
        plugins: [
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
        ].filter(Boolean)
    }
}
