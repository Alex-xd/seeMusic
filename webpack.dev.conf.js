const webpack = require('webpack')
const config = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

config.devtool = '#eval-source-map'

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        title: 'See Music',
        // 在devServer中这里的filename是相对于output.publicPath的路径!
        // 所以使用了此插件其实就不管output.path的路径了，因为在index.html
        // 中引用的文件路径都被publicPath替换了，所以就相当于所有文件都在
        // http://localhost:8000/ 下面
        filename: 'index.html',
        template: 'src/index.template.html',
        hash: true,
        minify: {
            removeComments: true
        }
    }),
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
            target: 'http://music.alexxd.com',
            secure: false
        }
    }
}

module.exports = config
