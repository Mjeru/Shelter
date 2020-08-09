const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [new ExtractTextPlugin("bundle.css")],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',"@babel/preset-react"]
                    }
                }
            },

        ],

    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000
      }

};