const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


module.exports = {

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },

    plugins: [
      new ServiceWorkerWebpackPlugin({
          entry: path.join(__dirname, 'src/serviceWorker.js'),
      })
    ]
}