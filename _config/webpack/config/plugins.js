'use strict';
exports.__esModule = true;
var env = require('./base').taro.env;
var _ = require('lodash');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin,
    DefinePlugin = webpack.DefinePlugin;

env.TARO_ENV = 'h5';
env.NODE_ENV = process.env.NODE_ENV || 'development';

exports.plugins = {
    HtmlWebpackPlugin: HtmlWebpackPlugin,
    DefinePlugin: DefinePlugin,
    HotModuleReplacementPlugin: HotModuleReplacementPlugin,
    MiniCssExtractPlugin: MiniCssExtractPlugin,
    UglifyJsPlugin: UglifyJsPlugin
};
exports.options = {
    HtmlWebpackPlugin: {
        title: 'Webpack app',
        template: 'src/index.html',
        filename: 'index.html',
        favicon: false,
        chunks: 'all'
    },
    DefinePlugin: _.chain(env)
        .mapKeys(function(value, key) {
            return 'process.env.' + key;
        })
        .mapValues(JSON.stringify)
        .value(),
    HotModuleReplacementPlugin: {}
};
exports.compose = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.map(function(plugin) {
        return new exports.plugins[plugin](exports.options[plugin]);
    });
};
