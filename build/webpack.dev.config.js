/**
 * Created by paul on 2017/6/5.
 */
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'process.env.DEPLOYMENT_ENV': `'${process.env.DEPLOYMENT_ENV}'`,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 80,
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true
    },
});
