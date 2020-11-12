'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/pages/index.pug'
        })
    ];

    return {
        entry: './source/pages/index.pug',
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader'
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }],
                },
            ],
        },
        plugins
    };
}