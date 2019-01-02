const webpack = require('webpack');
const config = require('./config/prod');
const rimraf = require('rimraf');
const path = require('path');
const build = require('./translate').build;

rimraf(path.resolve(process.cwd(), 'build'), () => {});

build({}).then(() => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(
            stats.toString({
                errors: true,
                errorDetails: true,
                children: false,
                modules: false,
                chunks: false, // Makes the build much quieter
                colors: true // Shows colors in the console
            })
        );
    });
});
