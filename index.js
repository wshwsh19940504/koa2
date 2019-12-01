const koa = require('koa')
const app= new koa();

//解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
	origin:['http://localhost:8080'],
	credentials:true,
}));

//接收前端的post请求,并解析
const bodyParser = require('koa-bodyparser')
//调用然后，注册，实现中间件
app.use(bodyParser())

// 加载路由，通过路由找打控制器
const Router = require('koa-router')


let router = new Router();
//与前端user对应,启动路由
let user = require('./controller/user.js');
router.use('/user',user.routes());


let product = require('./controller/product.js')
router.use('/product',product.routes())

let type = require('./controller/type.js')
router.use('/type',type.routes())

app.use(router.routes());
//只允许特定方法进行请求
app.use(router.allowedMethods());

const {connect,initSchemas} = require('./init.js');
//调用connect方法,立即执行函数前面语句必须加；号，否则报错
(async ()=>{
	//由于是异步操作，
	await connect();
	initSchemas()
})();


//开启服务
app.use(async (ctx)=>{
	ctx.body = "开启了服务";
})

//监听端口
app.listen(3000,()=>{
	console.log('开启koa服务器成功')
})