const webpack = require('webpack')
const config = require('./webpack.base.conf')

config.devtool = '#eval-source-map'

config.plugins = (config.plugins || []).concat([
    // none
])

// 这里把接口在/Server/下的所有路由都代理
// 到远程服务器的8080端口上，以解决跨域问题
config.devServer = {
    historyApiFallback: true,
    noInfo: true,
    port: 8000,
    proxy: {
        '/Server/**': {
            changeOrigin: true,
            target: 'http://119.29.148.154:8080',
            secure: false
        }
    }
}

module.exports = config
