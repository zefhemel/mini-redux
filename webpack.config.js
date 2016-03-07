var webpack = require("webpack");
var path = require("path");

module.exports = {
    target: "web",
    debug: false,
    devtool: "source-map",
    entry: {
        app: [
            "./src/index.jsx"
        ]
    },
    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
        // publicPath: "/static/",
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [{
            test: /\.jsx|\.js$/,
            exclude: /node_modules/,
            loader: "babel?presets[]=react,presets[]=es2015"
        }]
    }
};
