const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// 避免客户端js被缓存的问题以及将生产文件分开打包
// update: 直接使用HtmlWebpackPlugin中的hash选项自动打hash
// config.output.filename = '[name].[hash:6].js'
config.output.chunkFilename = '[id].[hash:6].js'

let SOURCE_MAP = true

config.devtool = SOURCE_MAP ? '#source-map' : false

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        title: 'See Music',
        filename: '../index.html',
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

    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),

    new FaviconsWebpackPlugin({
        logo: './src/assets/favicon.png',
        title: 'See Music',
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
        }
    })
])

module.exports = config
