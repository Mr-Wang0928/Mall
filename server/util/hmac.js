/*
* @Author: Tom
* @Date:   2018-08-06 14:59:21
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-13 17:52:26
*/
const crypto = require('crypto');

// const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha256');
/*
const hash = crypto.createHash('sha512');

hash.update('test');

console.log(hash.digest('hex'));
*/
/*
const hmac = crypto.createHmac('sha256', 'sdjfkdsjfkdsfj2sdfdsf');
hmac.update('test');
console.log(hmac.digest('hex'));
*/

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha256', 'sdjfkdsjfkdsfj2sdfdsf');
	hmac.update(str);
	return hmac.digest('hex');
}
