const Koa = require('koa')
const Router = require('koa-router')

let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertType',async (ctx)=>{
    fs.readFile('./data/type.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let count = 0;
        const Type = mongoose.model('Type')
        data.map((value,index)=>{
            let type =new Type(value);
            type.save().then(()=>{
                count++;
                console.log('成功'+ count)
            }).catch(err=>{
                console.log('失败了'+err)
            })
        })
    })
    ctx.body='写入type成功'
})
// 去数据库读取
router.get('/getTypes',async(ctx)=>{
    const Type = mongoose.model('Type')
    await Type.find({}).exec().then(res=>{ctx.body=res})
})
module.exports = router; 