const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/pages/index.pug'
        }), new CopyWebpackPlugin({
            patterns: [
                { from: 'source/js', to: '.' }
            ]
        })
    ];
    return merge(common(env), {
        plugins,
        mode: 'development'
    });
};
