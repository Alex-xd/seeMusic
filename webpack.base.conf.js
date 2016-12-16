const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        // 生成的文件实体存放路径
        path: path.resolve(__dirname, './dist/static/'),
        // publicPath就是打包生成的文件在引用时在前面的替换路径 src="publicPath/index_bundle.js"
        // 此处有坑，因为路径最后是直接拼接的，所以最后必须要加上反斜杠！！
        publicPath: 'http://localhost:8000/',
        filename: '[name].[hash:6].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    autoprefixer: {
                        browsers: ['last 3 versions']
                    },
                    loaders: {
                        js: 'babel-loader',
                        scss: 'vue-style-loader!css-loader?souceMap!sass-loader',
                        sass: 'vue-style-loader!css-loader?souceMap!sass-loader?'

                        // css: ExtractTextPlugin.extract({
                        //     fallbackloader: 'vue-style-loader',
                        //     loader: 'vue-style-loader!css!sass?souceMap',
                        // }),
                        // sass: ExtractTextPlugin.extract({
                        //     fallbackloader: 'vue-style-loader',
                        //     loader: 'vue-style-loader!css!sass?souceMap',
                        // }),
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
                loader: 'style-loader!css-loader?souceMap!sass-loader!postcss-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?souceMap!postcss-loader'
            },
            // 支持font awesome的一组loader
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }, {
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
                // 给postcss添加autoprefixer  (postcss是一个css处理平台)
                // TODO:这里暂时还不知道怎么自定义浏览器版本
                context: __dirname,
                postcss: [autoprefixer]
            },
            vue: {
                // 配置让所有vue组件中的样式都pipe through postcss
                postcss: [require('autoprefixer')()]
            }
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
    ]
}
