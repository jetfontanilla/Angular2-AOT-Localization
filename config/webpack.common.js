var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
    entry: {
        "common-app": "./app/common-app.ts",
        "quiz-app": "./app/quiz-app.ts",
        "common-app.aot": "./app/common-app.aot.ts",
        "quiz-app.aot": "./app/quiz-app.aot.ts",
        "vendor": "./app/vendor.ts",
        "polyfill": "./app/polyfill.ts"
    },

    output: {
        path: "./dist/",
        filename: "[name].js"
    },

    resolve: {
        extensions: ["", ".js", ".ts"]
    },

    module: {
        noParse: [/localforage.js$/],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                loader: "html"
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