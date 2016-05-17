var path = require('path');
var webpack = require("webpack");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'app')
        }]
    }
}