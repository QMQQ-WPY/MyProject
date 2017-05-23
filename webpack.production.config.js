var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: "#cheap-source-map",
    entry: {
        main: __dirname+'/app/index.js'
    },
    output: {
        path: __dirname+'/build',
        filename: 'bundle.js'
    },
    devServer: {  //具体的作用还不清楚
        contentBase: './build',
        port: 3415,
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                exclude: __dirname+'/node_modules',
                loaders: 'json-loader'
            },
            {
                test: /\.js[x]?$/,
                exclude: __dirname+'/node_modules',
                loaders: 'babel-loader',
                options: {
                    presets: ['es2015','react'],
                    env: {
                        development: {
                            "plugins": [["react-transform", {
                                "transforms": [{
                                    "transform": "react-transform-hmr",
                                    "imports": ["react"],
                                    "locals": ["module"]
                                }]
                            }]]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: __dirname+'/node_modules',
                use: ['style-loader','css-loader?modules','postcss-loader']
                // loader: 'style-loader!css-loader?modules'//这种写法也可以，但是注意style-loader与css-loader的顺序不能变化

            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: __dirname+'/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};