const loaders = require('./loaders');
const base = require('./base');
const path = require('path');
const plugins = require('./plugins');

module.exports = {
    mode: 'development',
    ...base.default,
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
                use: loaders.pick('style', 'css', 'postcss', 'less')
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: loaders.pick('style', 'cssmodule', 'postcss', 'stylus')
            },
            {
                test: /\.styl$/,
                include: /node_modules/,
                use: loaders.pick('style', 'css', 'postcss', 'stylus')
            }
        ]
    },
    optimization: {
        noEmitOnErrors: true
    },
    plugins: plugins.compose(
        'HtmlWebpackPlugin',
        'DefinePlugin',
        'HotModuleReplacementPlugin'
    )
};
