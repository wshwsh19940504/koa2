const Router = require('koa-router')
let router = new Router();
const mongoose = require('mongoose')
const Koa =require('koa')
const fs= require('fs')


router.get('/insertProductInfo',async (ctx)=>{
   fs.readFile('./data/product.json','utf8',(err,data)=>{
       data = JSON.parse(data);
       console.log(data);
       let count = 0;
       //获取模型
       const Product = mongoose.model('product')
       data.map((value,index)=>{
          console.log(value)
          let product = new Product(value);
          //随机生成类型，范围1-8
          product.type = Math.floor(Math.random()*8) + 1;
          product.save().then(()=>{
              count++
              console.log('成功了'+count)
          }).catch(err=>{
              console.log('失败了')
          })
       })
   });
   //必须写ctx.body,否则无法执行
   ctx.body='导入了数据'
})

router.get('/getProductsByType', async (ctx)=>{
    const Product=mongoose.model('product')
    await Product.find({
        type:ctx.query.typeId
    }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res=>{
        console.log(res)
        ctx.body=res; 
    }).catch(err=>{
        console.log(err)
    })

})

router.get('/getDetail',async(ctx)=>{
     const Product = mongoose.model('product')
     //调用exec方法，然后执行
     console.log(ctx)
     await Product.findOne({_id:ctx.query.id}).exec().then(res=>{
         ctx.body=res
     }).catch(err=>{
         console.log(err)
     })
})

module.exports = router;