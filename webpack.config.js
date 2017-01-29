var path = require('path');
var _root = path.resolve(__dirname);
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'boot': './src/client/boot.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file?name=[name].[hash].[ext]'
            },
            // {
            //     test: /\.css$/,
            //     include: root('src', 'client'),
            //     loader: 'raw'
            // },
            {
                test: /\.scss$/,
                include: root('src', 'client'),
                loader: 'raw!sass'
            },
            {
                test: /\.css$/,
                include: root('src', 'public'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            }
        ]
    },

    output: {
        path: root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'boot'
        }),

        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            favicon: 'src/public/favicon.ico'
        })
    ],

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};