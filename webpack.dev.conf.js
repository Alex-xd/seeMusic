const webpack = require('webpack');
const config = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.output.publicPath = '/'
config.devtool = '#cheap-module-eval-source-map';

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        title: 'See Music',
        // 在devServer中这里的filename是相对于output.publicPath的路径!
        // 所以使用了此插件其实就不管output.path的路径了，因为在index.html
        // 中引用的文件路径都被publicPath替换了，所以就相当于所有文件都在
        // http://localhost:8000/ 下面
        filename: 'index.html',
        template: 'src/index.template.html',
        favicon:'src/assets/favicon.png',
        hash: false,
        minify: {
            removeComments: true
        }
    }),
]);

config.devServer = {
    historyApiFallback: true,
    noInfo: true,
    port: 8000,
    proxy: {
        '/Server/**': {
            changeOrigin: true,
            target: 'https://music.alexxd.com/',
            secure: false
        }
    }
};

module.exports = config
