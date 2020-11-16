'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
    const plugins = [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'source/css', to: '.' }
            ]
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