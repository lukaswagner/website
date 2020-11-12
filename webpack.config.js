'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/pages/index.pug',
            inject: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'source/css', to: '.' },
            ]
        })
    ];

    return {
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