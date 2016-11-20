const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// TODO:ExtractTextPlugin这个插件还有问题，只能将import的css打包成一个文件，
// 但是不知道为什么依旧不能把组件中的CSS打包成单个文件

module.exports = {
    entry: './src/main.js',
    output: {
        // npm run build 路径配置
        // path: '/usr/local/Cellar/tomcat/8.5.6/libexec/webapps/Server/src/dist/',
        // publicPath: '/usr/local/Cellar/tomcat/8.5.6/libexec/webapps/Server/src/dist/',
        // npm run dev 开发路径配置 
        path: path.resolve(__dirname, '/dist/'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    devtool: '#eval-source-map',

    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    vue: {
                        autoprefixer: {
                            browsers: ['> 1%']
                        },
                        loaders: {
                            // css: 'vue-style-loader!css?souceMap!postcss',
                            // sass: 'vue-style-loader!css?souceMap!sass!postcss',
                            // css: ExtractTextPlugin.extract({
                            //     fallbackloader: 'vue-style-loader',
                            //     loader: 'vue-style-loader!css!sass?souceMap',
                            // }),
                            // sass: ExtractTextPlugin.extract({
                            //     fallbackloader: 'vue-style-loader',
                            //     loader: 'vue-style-loader!css!sass?souceMap',
                            // }),
                            js: 'babel-loader'
                        }
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
                test: /\.scss$/,
                loader: 'style-loader!css-loader?souceMap!sass-loader!postcss-loader'
                    // 想要把import的文件都打包成一个文件就启用下面的配置
                    // loader: ExtractTextPlugin.extract({
                    //     fallbackloader: 'style',
                    //     loader: 'css?souceMap!sass!postcss',
                    // })
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?souceMap!postcss-loader'
                    // loader: ExtractTextPlugin.extract({
                    //     fallbackloader: 'style',
                    //     loader: 'css?souceMap!postcss',
                    // })
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

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                // 给postcss添加autoprefixer  (postcss是一个css处理平台)
                // TODO:这里暂时还不知道怎么自定义浏览器版本
                context: __dirname,
                postcss: [
                    autoprefixer
                ]
            },
            vue: {
                // 配置让所有vue组件中的样式都pipe through postcss
                postcss: [require('autoprefixer')()]
            }
        }),
        // new ExtractTextPlugin({
        //     filename: 'build.css',
        //     disable: false,
        //     allChunks: true
        // })
    ],

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, './src'),
            'api': path.resolve(__dirname, './src/api'),
            'components': path.resolve(__dirname, './src/components'),
            'store': path.resolve(__dirname, './src/store')
        }
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 8000,
        proxy: {
            // 这里设置代理，把ajax的接口在/Server/下的所有
            // 路由都代理到服务器的8080端口上，以解决跨域问题
            '/Server/**': {
                changeOrigin: true,
                target: 'http://119.29.148.154:8080',
                secure: false
            }
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
