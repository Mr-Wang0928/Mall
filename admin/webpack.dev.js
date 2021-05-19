const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//内容的目录,将dist目录下的文件serve到localhost:8080下运行
        port: 5001,//服务运行的端口
        open:true,//自动打开浏览器窗口
        historyApiFallback: true,
        proxy: {
            // '/users': 'http://192.168.1.103:3000',
            // '/counts': 'http://192.168.1.103:3000',
            // '/categories': 'http://192.168.1.103:3000',
            // '/users': 'http://192.168.1.102:3000'
            
            '/users': 'http://127.0.0.1:5000',
            '/counts': 'http://127.0.0.1:5000',
            '/categories': 'http://127.0.0.1:5000',
            '/attrs': 'http://127.0.0.1:5000',
            '/products': 'http://127.0.0.1:5000',
            '/orders': 'http://127.0.0.1:5000',
            '/ads': 'http://127.0.0.1:5000',
        }
    }
})