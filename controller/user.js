// 接收前端发过来的请求
const Router = require('koa-router')
let router = new Router();
const mongoose = require('mongoose')

//调用registUser方法
router.post('/registUser',async (ctx)=>{
    //获取model,User对应发布的模型名字
    const User = mongoose.model('User')
    //接收post请求，封装成user对象
    let newUser = new User(ctx.request.body)
    //使用save保存信息,key需要一一对应
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功',
            
        }
    }).catch(err=>{
        ctx.body = {
            code:500,
            message:err
        }

    })
});

router.post('/loginUser',async (ctx) =>{
     //接收前端数据
     let loginUser = ctx.request.body;
     let userName = loginUser.userName
     let password = loginUser.password
     //引入model
     const User = mongoose.model('User')
     //比对，查询用户名是否存在，存在再去比较密码exec()方法返回符合条件数组
     await User.findOne({userName:userName}).exec().then(async (result)=>{
         if(result){
             //实例化，才能使用模型里面方法
            let newUser = new User();
            await newUser.comparePassword(password,result.password).then(isMatch =>{
                //登陆成功
                if (isMatch) {
                    ctx.body={
                        code:200,
                        message:'登陆成功',
                        userInfo:result
                    }
                }else{
                    ctx.body = {
                        code:201,
                        message:'登陆失败'
                    }
                }
            })
         }else{
             ctx.body={
                 code:201,
                 message:'用户名不存在'
             }
         }
     })

})
 
module.exports = router