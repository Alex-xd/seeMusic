const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 避免客户端js被缓存的问题以及将生产文件分开打包
// update: 直接使用HtmlWebpackPlugin中的hash选项自动打hash
// config.output.filename = '[name].[hash:6].js'
// config.output.chunkFilename = '[id].[hash:6].js'
config.output.path = path.resolve(__dirname, './dist/static/')
config.output.publicPath = './static/' // 此处有坑:最后必须要加上反斜杠！

let SOURCE_MAP = true

config.devtool = SOURCE_MAP
    ? '#source-map'
    : false

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        title: 'See Music', filename: '../index.html', // build模式下这里是相对于output.path的路径
        template: 'src/index.template.html',
        hash: true,
        minify: {
            removeComments: true
        }
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),

    new webpack.LoaderOptionsPlugin({minimize: true})
])

module.exports = config
