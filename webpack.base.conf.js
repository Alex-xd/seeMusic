const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
        entry: './src/main.js',
        output: {
            // 生成的文件实体存放路径
            path: path.resolve(__dirname, './dist/static/'),
            // publicPath就是打包生成的文件在引用时在前面的替换路径 src="publicPath/index_bundle.js"
            // 此处有坑，因为路径最后是直接拼接的，所以最后必须要加上反斜杠！！
            publicPath: 'http://localhost:8001/',
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    autoprefixer: {
                        browsers: ['last 2 versions']
                    },
                    loaders: {
                        js: 'babel-loader',
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader?souceMap',
                            fallbackLoader: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            loader: 'css-loader?souceMap!sass-loader',
                            fallbackloader: 'vue-style-loader'
                        }),
                        // scss: 'vue-style-loader!css-loader?souceMap!sass-loader',
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
                options: {
                    name: '[name].[ext]?[hash:6]'
                }
            }, {
                test: /\.s[a|c]ss$/,
                loader: ExtractTextPlugin.extract({
                    loader: "css-loader?souceMap!sass-loader!postcss-loader",
                    fallbackLoader: "style-loader"
                })
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: "css-loader?souceMap!postcss-loader",
                    fallbackLoader: "style-loader"
                })
            },
            // 支持font awesome的一组loader
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },

    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, './src'),
            'assets':path.resolve(__dirname, './src/assets'),
            'css': path.resolve(__dirname, './src/css'),
            'api': path.resolve(__dirname, './src/api'),
            'components': path.resolve(__dirname, './src/components'),
            'store': path.resolve(__dirname, './src/store'),
            'node_modules': path.resolve(__dirname, './node_modules'),
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
            filename:'style.css',
            // disable:true
            allChunks: false
        })
    ]
}
