/**
 * Created by paul on 2017/6/5.
 */
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CONFIG = require('../config');
const path = require("path");

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, `../dist/${process.env.DEPLOYMENT_ENV}`),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.DEPLOYMENT_ENV': `'${process.env.DEPLOYMENT_ENV}'`
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
            mangle: true,
            // 不混淆config文件
            // exclude: /config/
        }),
        // new BundleAnalyzerPlugin()

    ]
});