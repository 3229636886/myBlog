const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        // 生产环境
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('@/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                marked: 'marked'
            })

            config.plugin('html').tap(args => {
                args[0].title = 'myBlog'
                args[0].isProd = true
                return args
            })
        })
        // 开发环境
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('@/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
})