'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');

function code(char) {
    return char.charCodeAt();
}

function charRange(s, e) {
    return String.fromCharCode(...[...Array(e - s + 1)].map((_, i) => i + s));
}

function chars() {
    const num = charRange(code('0'), code('9'));
    const lower = charRange(code('a'), code('z'));
    const upper = charRange(code('A'), code('Z'));
    const other = ' #&\'()+,-./:?@[]';
    return [num, lower, upper, other];
}

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
            }),
            new FontminPlugin({
                glyphs: chars()
            }),
            new CompressionPlugin({
                minRatio: 0.9
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
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    use: { loader: 'file-loader', options: flOptions },
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
        }
    };
}
