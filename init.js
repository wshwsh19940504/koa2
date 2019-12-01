const mongoose = require('mongoose');
// 端口号默认27017，连接数据库信息
const db = 'mongodb://localhost:27017/yimeishop';
// 引入Schema
const glob = require('glob')
const path = require('path')
//请求目录下，所有模型
exports.initSchemas = ()=>{
    //注意__dirname是两个下划线
    glob.sync(path.resolve(__dirname,'./model','*.js')).forEach(require)
};

exports.connect = ()=>{
    // 连接数据库
    mongoose.connect(db,{useNewUrlParser:true})
    //监听数据库连接
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db)
    })
    mongoose.connection.on('error',err=>{
        console.log(err)
        mongoose.connect(db)
    })
    mongoose.connection.once('open',()=>{
        console.log('mongodb 连接成功')
    })
};