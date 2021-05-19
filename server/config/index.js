/*
* @Author: Tom
* @Date:   2020-01-10 12:03:05
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-10 12:19:26
*/
const dev = require('./dev.js')
const prod = require('./prod.js')

module.exports = process.env.NODE_ENV === 'production' ? prod : dev