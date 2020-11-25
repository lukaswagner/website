const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const terser = require('terser');

module.exports = function (env) {
    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/pages/index.pug',
            inject: false
        }), new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'source/js',
                    to: '.',
                    transform: (c) => {
                        return terser.minify(
                            c.toString(),
                            { mangle: { toplevel: true, reserved: ['mail'] } }
                        ).then((o) => o.code);
                    }
                }
            ]
        })
    ];
    return merge(common(env), {
        plugins,
        mode: 'production'
    });
};
