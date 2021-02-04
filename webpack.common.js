'use strict';

module.exports = function (env) {
    const flOptions = {
        esModule: false,
        name: '[name].css'
    }

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
                        { loader: 'file-loader', options: flOptions },
                        { loader: 'extract-loader' },
                        { loader: 'css-loader', },
                    ],
                },
            ],
        },
    };
}