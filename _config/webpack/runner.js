const webpack = require('webpack');
const taro = require('./config/base').taro;
const config = require('./config/dev');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const path = require('path');
const build = require('./translate').build;

const url = require('url');
const utils = require('@tarojs/webpack-runner/dist/util/logHelper');
const contentBase = path.join(process.cwd(), '.temp');

const publicPath = config.output.publicPath;
const devServerOptions = {
    publicPath,
    compress: true,
    contentBase,
    disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    historyApiFallback: { disableDotRule: false },
    host: '0.0.0.0',
    hot: true,
    https: false,
    inline: true,
    port: 10087,
    quiet: true,
    watchOptions: { ignored: /node_modules/ },
    ...taro.h5.devServer
};

const devUrl = url.format({
    protocol: devServerOptions.https ? 'https' : 'http',
    hostname: devServerOptions.host,
    port: devServerOptions.port,
    pathname: publicPath
});

build({
    watch: true
}).then(() => {
    WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
    const compiler = webpack(config);
    utils.bindDevLogger(devUrl, compiler);
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(devServerOptions.port, devServerOptions.host, err => {
        if (err) {
            return console.log(err);
        }

        /* 补充处理devServer.open配置 */
        if (devServerOptions.open) {
            opn(devUrl);
        }
    });
});
