'use strict';

const path = require('path');
const PugPlugin = require('pug-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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

module.exports = function (env, argv) {
    return {
        output: {
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        entry: {
            index: './source/index.pug'
        },
        plugins: [
            new PugPlugin(),
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
                    use: {
                        loader: PugPlugin.loader,
                        options: {
                            filters: { 'md': require('./filters/md-light') }
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'css-loader', options: { import: false } },
                        { loader: 'css-import-loader' },
                    ]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext][query]'
                    }
                },
                {
                    test: /\.asc$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name][ext][query]'
                    }
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
        },
        devServer: {
            hot: false
        }
    };
}
