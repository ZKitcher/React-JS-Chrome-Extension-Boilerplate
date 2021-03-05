const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, './contentBase'),
        historyApiFallback: true
    },
    entry: {
        popup: path.resolve(__dirname, "./contentBase/src/index-popup.js"),
        options: path.resolve(__dirname, "./contentBase/src/index-options.js"),
        content: path.resolve(__dirname, "./contentBase/src/index-content.js")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'extenstion')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'contentBase/public/html/popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            template: 'contentBase/public/html/options.html',
            chunks: ['options']
        }),
        new HtmlWebpackPlugin({
            filename: 'content.html',
            template: 'contentBase/public/html/content.html',
            chunks: ['content']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'contentBase/manifest.json', to: '[name].[ext]' },
                { from: 'contentBase/src/js/background.js', to: '[name].[ext]' },
                { from: 'contentBase/src/js/inject_script.js', to: '[name].[ext]' },
                { from: 'contentBase/public/assets/*.png', to: '[name].[ext]' }
            ]
        }),
        new CleanWebpackPlugin()
    ]
}
