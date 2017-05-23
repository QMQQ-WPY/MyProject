var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
// fs.exists('build',function(exists){
//     console.log(exists);
//     if(exists){
//         var content = 'var content = require("app/content.jsx");\nconsole.log(123);\nmodule.exports=content';
//         fs.writeFile("build/build.js",content,function(err){
//             if(err) throw err;
//             console.log("Success");
//             fs.readFile("build/build.js", function(err, buffer){
//                 if(err) throw err;
//                 console.log(buffer.toString());
//             })
//         });
//     }
// });

// fs.readdir('.',function(err,files){
//     if(err) throw err;
//     console.log(files);
//     (files||[]).forEach(function(file,index){
//         fs.stat('./'+file, function(err,obj){
//             if(err) throw err;
//             if(obj.isFile()){
//                 console.log("%s is file",file);
//             } else if(obj.isDirectory()){
//                 console.log("%s is directory",file);
//             } else {
//                 console.log(file);
//             }
//         })
//     })
// });

// fs.watchFile('./package.json', function (curr, prev) {
//     console.log('the current mtime is: ' + curr.mtime);
//     console.log('the previous mtime was: ' + prev.mtime);
// });
// fs.unwatchFile('./package.json');

// console.log(process.argv);
// console.log(process.env);
// console.log(process.pid);
// process.kill(process.pid);
// console.log(process.pid);
// console.log(process.platform);
// console.log(process.title);
// console.log(process.version);
// console.log(process.execPath);
// console.log(process.execArgv);
// console.log(process.cwd());
// console.log(__dirname);


// process.env.test = null;
// console.log(process.env.test);
// console.log(typeof(process.env.test)==="object");
//
// process.env.test = undefined;
// console.log(process.env.test);
// console.log(typeof(process.env.test)==="undefined");
// delete process.env.test;
// console.log(process.env);

// process.stdin.setEncoding('utf8');
// process.stdin.on('readable', () => {
//     var chunk = process.stdin.read();
//     if(typeof chunk === 'string'){
//         chunk = chunk.slice(0,-1);
//         process.stdout.write(`stringLength:${chunk.length}\n`);
//     }
//     if(chunk === ''){
//         process.stdin.emit('end');
//         return
//     }
//     if (chunk !== null) {
//         process.stdout.write(`data: ${chunk}\n`);
//     }
// });
// process.stdin.on('end', () => {
//     process.stdout.write('end');
// });
process.on('SIGINT', function() {
    console.log('SIGINT信号，按Control-D退出');
});
process.on('SIGTERM', function() {
    console.log('SIGTERM信号');
});
module.exports = {
    devtool: "#cheap-source-map",
    entry: {
        main: __dirname+'/app/index.js',
        vendor: __dirname+'/app/vendor.js'
    },
    output: {
        path: __dirname+'/public',
        filename: 'bundle-[hash].js'
    },
    devServer: {  //具体的作用还不清楚
        contentBase: './public',
        port: 3413,
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
                exclude: __dirname + '/node_modules',
                // use: ['style-loader','css-loader?modules','postcss-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules','postcss-loader'],
                    publicPath: __dirname+'/build'
                })
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
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true
        // }),
        new ExtractTextPlugin({
            filename: 'style-[hash].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].js'
        })
    ]
};