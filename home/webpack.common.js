const path = require('path');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const htmlWebpackConfig = (name,title)=>({
    template: './src/view/'+name+'.html',//模板文件
    filename: name+'.html',//输出的文件名
    //inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
    hash: true,//给生成的文件添加一个唯一的hash
    chunks: [name,'common'],//需要包含的入口中的chunk
    title:title
})
module.exports = {
    entry: { //对象写法指定需要打包的入口文件
        //chunk名称:入口文件路径
        'index'                 :'./src/pages/index/index.js',
        'common'                :'./src/pages/common/index.js',
        'user-login'            :'./src/pages/user-login/index.js',
        'user-dynamic-login'    :'./src/pages/user-dynamic-login/index.js',
        'user-register'         :'./src/pages/user-register/index.js',
        'result'                :'./src/pages/result/index.js',
        'list'                  :'./src/pages/list/index.js',
        'detail'                :'./src/pages/detail/index.js',
        'cart'                  :'./src/pages/cart/index.js',
        'order-confirm'         :'./src/pages/order-confirm/index.js',
        'order-list'            :'./src/pages/order-list/index.js',
        'order-detail'          :'./src/pages/order-detail/index.js',
        'payment'               :'./src/pages/payment/index.js',
        'user-center'           :'./src/pages/user-center/index.js',
        'user-update-password'  :'./src/pages/user-update-password/index.js',
    },
    output: {
        filename: 'js/[name]-[chunkhash].bundle.js',//指定打包后的文件名称,不用带路径
        publicPath: '/',//指定输出参考根路径
        path: path.resolve(__dirname, 'dist')//指定打包后文件的存放位置,用绝对路径
    },
    resolve: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            util: path.resolve(__dirname, 'src/util/'),
            api: path.resolve(__dirname, 'src/api/'),
            swiper: path.resolve(__dirname, 'node_modules/swiper/'),
            
        }
    },    
    // plugins: [new MiniCssExtractPlugin()],
    module:{
        //配置loader
        rules: [
            //处理css文件
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },         
            //处理图片
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff2|woff)\??.*$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 400,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            
            //babel处理ES6
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','stage-3'],
                    },
                }
            },
            //处理antd的主题
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, 
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, 
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        
                        // options: {
                        //     lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                        //         modifyVars: {
                        //             'primary-color': '#1DA57A',
                        //             'link-color': '#1DA57A',
                        //             'border-radius-base': '2px',
                        //         },
                        //         javascriptEnabled: true,
                        //     },
                        // },
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, 'src/pages/common/them.less'),
                                path.resolve(__dirname, 'src/pages/common/iconfont.css'),
                                path.resolve(__dirname, 'src/pages/common/reset.css'),
                                path.resolve(__dirname, 'src/view/22/iconfont.js'),
                            ]
                        }
                    },
                         
                ],
            },
            //处理tpl文件
            {
                test:/\.tpl$/,
                use: {
                    loader: 'html-loader',
                }               
            }                      
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin(htmlWebpackConfig('index','首页')),
        new htmlWebpackPlugin(htmlWebpackConfig('list','列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('user-login','登录列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('user-dynamic-login','验证码登录')),
        new htmlWebpackPlugin(htmlWebpackConfig('user-register','注册账号')),
        new htmlWebpackPlugin(htmlWebpackConfig('result','结果列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('detail','详细列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('cart','购物车列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('order-confirm','订单列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('order-list','订单列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('order-detail','订单详情')),
        new htmlWebpackPlugin(htmlWebpackConfig('payment','支付列表')),
        new htmlWebpackPlugin(htmlWebpackConfig('user-center','用户中心')),        
        new htmlWebpackPlugin(htmlWebpackConfig('user-update-password','修改密码')), 
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash]-bundle.css'
        }),
        
       
    ]
};