const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                // vue-loader options go here
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader?importLoaders=1',
                'postcss-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        //postcss兼容处理,直接加到属性里有问题
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer
                ]
            }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 8000,
        proxy: {
            '/Server/**': {
                changeOrigin: true,
                target: 'http://localhost:8080/',//这里设置代理，把ajax的接口都代理到服务器的8080端口上，以解决跨域问题
                secure: false
            }
        }
    },
    devtool: '#eval-source-map'
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
