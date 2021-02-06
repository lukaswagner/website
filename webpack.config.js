'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const flOptions = {
        esModule: false,
        name: '[name].[ext]'
    }

    return {
        entry: {
            mail: './source/js/mail.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './source/index.pug'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: { loader: 'pug-loader' },
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'file-loader', options: flOptions },
                        { loader: 'extract-loader' },
                        { loader: 'css-loader' },
                    ]
                },
                {
                    test: /\.ttf$/,
                    use: { loader: 'file-loader', options: flOptions },
                },
            ],
        }
    };
}