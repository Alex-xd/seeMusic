const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildOpt = require('./build.option');

// update: 使用HtmlWebpackPlugin中的hash选项自动打hash
// config.output.path = path.resolve(__dirname, './build/static/');
// publicPath就是打包生成的文件在引用时在前面的替换路径 src="publicPath/index_bundle.js"
// 此处有坑，因为路径最后是直接拼接的，所以最后必须要加上反斜杠！！并且最好填绝对路径！！不要填相对路径！
// config.output.publicPath = buildOpt.publicPath;

let SOURCE_MAP = true;

config.devtool = SOURCE_MAP
    ? '#source-map'
    : false;

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        title: 'See Music',
        filename: './index.html', // build模式下这里是相对于output.path的路径
        template: 'src/index.template.html',
        favicon: 'src/assets/favicon.png',
        hash: false,
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
]);

module.exports = config;
