'use strict';
exports.__esModule = true;
var path = require('path');
var postcssConf = require('./postcss.conf');
var postcssPlugins = postcssConf.getPostcssPlugins({
    designWidth: 750,
    deviceRatio: 2
});

const loaderUtils = require('loader-utils');

exports.babel = {
    loader: 'babel-loader',
    options: {
        sourceMap: true,
        presets: [path.resolve(__dirname, './babel-loader-preset.js')]
    }
};
exports.postcss = {
    loader: 'postcss-loader',
    options: {
        // sourceMap: true,
        ident: 'postcss',
        plugins: postcssPlugins.map(([name, option]) => {
            return require(name)(option);
        })
    }
};
exports.less = {
    loader: 'less-loader'
};
exports.css = {
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        sourceMap: false
    }
};
exports.style = {
    loader: 'style-loader'
};
exports.stylus = {
    loader: 'stylus-loader',
    options: {
        sourceMap: false
    }
};
exports.sass = {
    loader: 'sass-loader'
};
var loaders = {
    style: exports.style,
    css: exports.css,
    cssmodule: {
        loader: 'css-loader',
        options: {
            ...exports.css.options,
            modules: true,
            localIdentName: '[folder]_[local]',
            getLocalIdent: (context, localIdentName, localName, options) => {
                if (localName && localName.match(/^_|(taro)/)) {
                    return localName;
                }

                return loaderUtils.interpolateName(
                    context,
                    localIdentName.replace('[local]', localName),
                    options
                );
            }
        }
    },
    less: exports.less,
    sass: exports.sass,
    stylus: exports.stylus,
    postcss: exports.postcss,
    'resolve-url': {
        loader: 'resolve-url-loader'
    }
};
exports.pick = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.map(function(item) {
        return loaders[item];
    });
};
exports.urlLoader = function(dist) {
    return {
        loader: 'url-loader',
        options: {
            limit: 2000,
            name: 'static/' + dist + '/[name].[hash:8].[ext]'
        }
    };
};
exports['default'] = {};
