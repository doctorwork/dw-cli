'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const path = require('path');
const defaultAutoprefixerOption = {
    enable: false,
    config: {
        browsers: ['Android >= 4', 'iOS >= 6'],
        flexbox: 'no-2009'
    }
};
const defaultPxtransformOption = {
    enable: true,
    config: {
        platform: 'h5',
        selectorBlackList: [/weui/]
    }
};
const defaultCssModulesOption = {
    enable: false,
    config: {
        generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
};
const defaultConstparseOption = {
    constants: [
        {
            key: 'taro-tabbar-height',
            val: '50PX'
        }
    ],
    platform: 'h5'
};
const optionsWithDefaults = ['autoprefixer', 'pxtransform', 'cssModules'];
const plugins = [];

const postcssOption = {
    autoprefixer: {
        enable: true
    },
    cssModules: {
        // enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
            generateScopedName: '[folder]_[local]'
        }
    }
};

exports.getPostcssPlugins = function({ designWidth, deviceRatio }) {
    if (designWidth) {
        defaultPxtransformOption.config.designWidth = designWidth;
    }
    if (deviceRatio) {
        defaultPxtransformOption.config.deviceRatio = deviceRatio;
    }
    const autoprefixerOption = Object.assign(
        {},
        defaultAutoprefixerOption,
        postcssOption.autoprefixer
    );
    const pxtransformOption = Object.assign(
        {},
        defaultPxtransformOption,
        postcssOption.pxtransform
    );
    const cssModulesOption = Object.assign(
        {},
        defaultCssModulesOption,
        postcssOption.cssModules
    );
    if (autoprefixerOption.enable) {
        plugins.push(['autoprefixer', autoprefixerOption.config]);
    }
    if (pxtransformOption.enable) {
        plugins.push(['postcss-pxtransform', pxtransformOption.config]);
    }
    if (cssModulesOption.enable) {
        plugins.push(['postcss-modules', cssModulesOption.config]);
    }
    plugins.push(['postcss-plugin-constparse', defaultConstparseOption]);
    return plugins;
};
