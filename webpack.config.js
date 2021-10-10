// webpack player

let webpack=require('webpack');
let path = require('path')
//引用插件
let HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:'./src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name][hash].js'
    },
    plugins:[
        //文件压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        /*
        * html-webpack-plugin
        * 动态生成html文件 js hash
        * */
        new HtmlwebpackPlugin({
            chunks:["app"],
            title: 'Hello world',
            filename: 'index.html',
            template: './index.html',//html文件的模板
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['','.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        root:"../node_modules",
        alias:{
            'vue':'vue/dist/vue.js'
        }
    },
    // 服务器配置相关  自动刷新
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}