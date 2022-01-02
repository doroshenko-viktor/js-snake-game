const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Snake Game',
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./public/styles.css", to: "styles.css" },
            ],
        }),
    ],
    devtool: "source-map"
};

// module.exports = {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     entry: './src/index.ts',
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//     },
// };

// const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

// module.exports = {
//     mode: 'development',
//     entry: './src/app.ts',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: 'dist'
//     },
//     static: {
//         directory: path.join(__dirname, 'dist'),
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.ts', '.js']
//     },
//     plugins: [
//         new CopyPlugin({
//             patterns: [
//                 { from: "./public", to: "" },
//             ],
//         }),
//     ],
// };