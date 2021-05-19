const fs = require('fs')


const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')
const mongoose = require('mongoose');
const {getRandomNum,getRandomStr} = require('./random.js')



//启动数据库
mongoose.connect('mongodb://localhost:27017/kmall',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});
db.once('open',()=>{
    const users=[]
    for(let i = 0;i<100;i++){
        const username = getRandomNum(1111,9999)
        users.push({
            username:username,
            password:hmac(username+''),
            isAdmin:i%2==0 ? true : false,
            isActive:i%2==0 ? '1' : '0',
            email:getRandomStr(4,4)+'@qq.com',
            phone:getRandomNum(137000,176999)
        })
    }
    UserModel.insertMany(users)
    console.log('DB connected....');
});
