const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD_PATH = path.resolve(__dirname, './build');
const ROOT_PATH = path.resolve(__dirname, './');
const SRC_PATH = path.resolve(__dirname, './src');

module.exports = {
    entry: './src/main.js',
    output: {
        // 生成的静态文件存放路径
        path: BUILD_PATH,
        // publicPath就是打包生成的文件在引用时在前面的替换路径 src="publicPath/index_bundle.js"
        // 此处有坑，因为路径最后是直接拼接的，所以最后必须要加上反斜杠！！
        publicPath: '/Server/build/',
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                autoprefixer: {
                    browsers: ['last 2 versions']
                },
                loaders: {
                    js: 'babel',
                    // css:'vue-style!css?souceMap',
                    // scss:'vue-style!css?souceMap!sass',
                    css: ExtractTextPlugin.extract({
                        use: 'css?souceMap',
                        fallback: 'vue-style'
                    }),
                    scss: ExtractTextPlugin.extract({
                        use: 'css?souceMap!sass',
                        fallback: 'vue-style'
                    }),
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=8192',
            options: {
                name: '[name].[ext]?[hash:6]'
            }
        }, {
            test: /\.s[a|c]ss$/,
            // loader:'style!css?souceMap!sass!postcss'
            loader: ExtractTextPlugin.extract({
                use: "css?souceMap!sass!postcss",
                fallback: "style"
            })
        }, {
            test: /\.css$/,
            // loader:'style!css?souceMap!postcss'
            loader: ExtractTextPlugin.extract({
                use: "css?souceMap!postcss",
                fallback: "style"
            })
        }, { // 支持font awesome的一组loader
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }]
    },
    resolveLoader:{
        moduleExtensions:["-loader"]
    },
// TODO:使用webpack code spliting技术分割代码按需加载，因为main.js太大了！！
// https://webpack.js.org/guides/code-splitting/
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        alias: {
            'vue$': 'vue/dist/vue',
            'root': ROOT_PATH,
            'src': SRC_PATH,
            'assets': SRC_PATH + '/assets',
            'css': SRC_PATH + '/css',
            'api': SRC_PATH + '/api',
            'components': SRC_PATH + '/components',
            'store': SRC_PATH + '/store',
            'node_modules': ROOT_PATH + '/node_modules',
        }
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                // 给postcss添加autoprefixer 
                context: __dirname,
                postcss: [autoprefixer]
            },
            vue: {
                // 配置让所有vue组件中的样式都pipe through postcss
                postcss: [require('autoprefixer')()]
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash:8].css',
            // disable:true
            // allChunks: true
        })
    ]
};
