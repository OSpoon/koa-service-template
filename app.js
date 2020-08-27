const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')

// 注册中间件,默认在middleware添加
middleware(app)
// 注册路由,默认在router添加
router(app)
// 监听服务
app.listen(80, () => {
  console.log('server is running at http://localhost:80\n\n')
})
