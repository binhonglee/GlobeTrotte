// const webpack = require("webpack");
// const path = require("path");
// const fs = require("fs");
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

// var config = {
//   mode: 'development',
//   devtool: "cheap-module-eval-source-map",
//   resolve: {
//     extensions: [".ts", ".js", ".vue"]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         loader: "ts-loader",
//         options: {
//           appendTsSuffixTo: [/\.vue$/]
//         }
//       },
//       {
//         test: /\.vue$/,
//         loader: "vue-loader"
//       },
//       {
//         test: /\.pug$/,
//         loader: 'pug-plain-loader'
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           'vue-style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new VueLoaderPlugin(),
//   ]
// };

// module.exports = config;
