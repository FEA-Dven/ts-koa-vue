
// 注意：引入的方式
// 引入koa
const koa = require('koa');
const app = new koa();
const path = require('path');

const static = require('koa-static');
const staticPath = './build';
// 配置静态web服务的中间件
app.use(static(
    path.join( __dirname, staticPath)
));
                
// 监听端口≈
app.listen(6006,function(){
    console.log('启动成功');
});