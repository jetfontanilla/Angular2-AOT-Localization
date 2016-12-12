var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
    entry: {
        "common-app": "./app/common-app.ts",
        "common-app.aot": "./app/common-app.aot.ts",
        "vendor": "./app/vendor.ts",
        "polyfill": "./app/polyfill.ts"
    },

    output: {
        path: "./dist",
        filename: "[name].js"
    },

    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            jquery: "jquery/src/jquery",
            TweenLite: "gsap/src/uncompressed/TweenLite"
        }
    },

    module: {
        noParse: [
            /localforage.js$/
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                loader: "html?minimize=false"
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
                test: /\.(xlf|xmb|xtb)$/,
                loader: "raw"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("app"),
                loader: ExtractTextPlugin.extract({fallbackLoader: "style", loader: "css?sourceMap"})
            },
            {
                test: /\.css$/,
                include: helpers.root("app"),
                loader: "raw"
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "polyfill"]
        })
    ]
};