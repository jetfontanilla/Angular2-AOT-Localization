var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
    entry: {
        "common-app": "./app/common-app.js",
        "quiz-app": "./app/quiz-app.js",
        "common-app.aot": "./app/common-app.aot.js",
        "quiz-app.aot": "./app/quiz-app.aot.js",
        "vendor": "./app/vendor.js",
        "polyfill": "./app/polyfill.js"
    },

    output: {
        path: "./dist/",
        filename: "[name].js"
    },

    resolve: {
    },

    module: {
        noParse: [/localforage.js$/],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },
            {
                test: /\.js$/,
                loader: 'angular2-template-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    /node_modules(\\|\/)@angular/
                ],
                exclude: [
                    /\.umd\.js$/
                ],
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: "raw"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file?name=assets/[name].[ext]"
            },
            {
                test: /\.(woff\?|woff2\?|ttf\?|eot\?|ico\?|svg\?|otf\?)/,
                loader: "file?name=assets/[name].[ext]"
            },
            {
                test: /\.(xlf|xmb)$/,
                loader: "file?name=locale/[name].[ext]"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("app"),
                loader: ExtractTextPlugin.extract("style", "css?sourceMap")
            },
            {
                test: /\.css$/,
                include: helpers.root("app"),
                loader: "raw"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "polyfill"]
        })
    ]
};