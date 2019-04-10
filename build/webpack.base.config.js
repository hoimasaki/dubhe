/**
 * Created by paul on 2017/6/5.
 */
const CONFIG = require('../config');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV;

const LESSLoader =  NODE_ENV === 'development' ? ['style-loader','css-loader','postcss-loader','less-loader'] :  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
        loader: 'css-loader',
        options: {
            minimize: true
        }
    }, 'postcss-loader', 'less-loader']
});
const CSSLoader = NODE_ENV === 'development' ? ['style-loader','css-loader','postcss-loader'] : ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
        loader: 'css-loader',
        options: {
            minimize: true
        }
    }, 'postcss-loader']
});

module.exports = {
    entry: {
        // config: './config/index.js',
        app: './src/main.js'
    },
    output: {
        path: CONFIG.OUTPUT_PATH,
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: LESSLoader
                    }
                }
            },
            {
                test: /\.css/,
                use: CSSLoader
            },
            {
                test: /\.less$/,
                use: LESSLoader
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(mp3|wav)$/i,
                loader: 'file-loader',
                options: {
                    limit: 819200,
                    name: 'voice/[name].[hash].[ext]'
                }
            }
        ]
    },
    devtool: '#source-map',
    plugins: [
        // 暴露全局变量,在所有js中可使用jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: CONFIG.HTML_TEMPLATE_PATH + '/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'error.html',
            template: CONFIG.HTML_TEMPLATE_PATH + '/error.html',
            inject: true,
            chunks: []
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[hash].js',
        })
    ]
};