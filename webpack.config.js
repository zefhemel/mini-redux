var webpack = require("webpack");
var path = require("path");

module.exports = {
    target: "web",
    debug: false,
    devtool: "source-map",
    entry: {
        app: [
            "./src/sample/index.jsx",
            "./src/sample/index.html",
            "./src/sample/index.css"
        ]
    },
    output: {
        path: __dirname + "/out",
        filename: "sample/bundle.js",
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
        }, {
            test: /\.html|\.css$/,
            loader: "file?name=[path][name].[ext]&context=src"
        }]
    }
};
