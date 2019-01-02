const path = require('path');
const root = process.cwd();
var merge = require('webpack-merge');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const taro = require(`${root}/config/index`)(merge);
const loaders = require('./loaders');

exports.__esModule = true;

exports.root = root;
exports['default'] = {
    // context: process.cwd(),
    devtool: 'cheap-eval-source-map',
    output: {
        path: path.join(root, 'build'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'chunk/[name].[chunkhash:8].js',
        publicPath: process.env.PUBLIC_URL || '/'
    },
    resolve: {
        symlinks: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFields: ['main', 'module'],
        modules: ['node_modules']
    },
    entry: {
        app: path.join(root, '.temp/app.js')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFields: ['main', 'module'],
        symlinks: true,
        modules: [path.join(root, 'node_modules'), 'node_modules']
    },
    resolveLoader: {
        modules: [path.join(root, 'node_modules')]
    }
};

exports.rules = [
    {
        test: /\.jsx?$/,
        use: [loaders.babel]
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [loaders.urlLoader('media')]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [loaders.urlLoader('fonts')]
    },
    {
        test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
        use: [loaders.urlLoader('images')]
    }
];

exports.taro = taro;
