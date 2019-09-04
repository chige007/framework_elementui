const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();
 
app.use(serve(__dirname + '/dist'));

app.listen(3000,()=>{
    console.log('服务已启动，请访问localhost:3000');
});