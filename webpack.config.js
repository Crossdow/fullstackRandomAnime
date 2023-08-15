const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        anilibria: './src/anilibria/aniLibriaAPI.js',
        modalWindow: './src/modalWindow/modalWindow.js',
        main: './src/mainApp.js',
        config: './src/config.js',
        library: './src/library/myLibraryButton.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    }
};