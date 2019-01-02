process.env.NODE_ENV = "'production'";

const loaders = require('./loaders');
const base = require('./base');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = require('./plugins');

module.exports = {
    ...base.default,
    mode: 'production',
    module: {
        rules: [
            ...base.rules,
            {
                test: /\.css|scss|sass$/,
                use: loaders.pick(
                    'style',
                    'css',
                    'postcss',
                    'resolve-url',
                    'sass'
                )
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader].concat(
                    loaders.pick('css', 'postcss', 'less')
                )
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader].concat(
                    loaders.pick('cssmodule', 'postcss', 'stylus')
                )
            },
            {
                test: /\.styl$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader].concat(
                    loaders.pick('css', 'postcss', 'stylus')
                )
            }
        ]
    },
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [],
        namedModules: true,
        runtimeChunk: {
            name: entrypoint => `runtime`
        },
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        }
    },
    plugins: plugins
        .compose(
            'HtmlWebpackPlugin',
            'DefinePlugin',
            'HotModuleReplacementPlugin'
        )
        .concat(
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash:8].css',
                chunkFilename: 'css/[id].[contenthash:8].css'
            })
        )
};
