const path = require('path');

module.exports = {
    publicPath: '/',
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                Global: path.resolve(__dirname, './global'),
                Bulma: path.resolve(__dirname, './node_modules/bulma'),
            },
        },
    },
};
