module.exports = {
    chainWebpack: config => {
        const path = require('path')
        if (process.env.NODE_ENV === 'test') {
            config.module
                .rule('nyc')
                    .enforce('post')
                    .include
                        .add(path.resolve(__dirname, 'src/cockpit'))
                        .end()
                    .use('istanbul-instrumenter-loader')
                        .loader('istanbul-instrumenter-loader')
                        .options({
                            esModules: true,
                        })
                        .end()
        }
    }
}
