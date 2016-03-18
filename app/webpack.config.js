const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const ProvidePlugin = webpack.ProvidePlugin;
module.exports = {
    entry: ['bootstrap-loader', path.resolve(__dirname, './app.js')],
    output: {
        path: path.resolve(__dirname, '../server/public'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({ //DO NOT USE 'PLUGIN'. THE 'S' is important!
            template: './components/index.html'
        }),
        new DefinePlugin({
            BASE_URL: JSON.stringify(process.env.BASE_URL || ''),
            CLIENT_ID: JSON.stringify(process.env.CLIENT_ID || '')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery'
        })
    ],
    module: {
        preloaders: [{
            test: /\.js$/, // include .js files
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
                    // cacheDirectory: true,
                    // plugins: [ 'transform-runtime' ]//https://www.npmjs.com/package/babel-plugin-transform-runtime
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
            }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass']
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.(woff|woff2)$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf$/,
            loader: "file-loader"
        }, {
            test: /\.eot$/,
            loader: "file-loader"
        }, {
            test: /\.svg$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader?limit=8192'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './scss')
                        ]
    }
}
