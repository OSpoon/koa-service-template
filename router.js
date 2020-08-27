const router = require('koa-router')()

module.exports = (app) => {
  console.log(app.controller)
  for (const mappingKey in app.controller) {
    const mapping = app.controller[mappingKey]
    for (const url in mapping) {
      if (url.startsWith('GET ')) {
        const path = url.substring(4)
        router.get(path, mapping[url])
        console.log(`register URL mapping: GET ${path}`)
      } else if (url.startsWith('POST ')) {
        const path = url.substring(5)
        router.post(path, mapping[url])
        console.log(`register URL mapping: POST ${path}`)
      } else {
        console.log(`invalid URL: ${url}`)
      }
    }
  }
  console.log('----------------路由注册完成----------------\n\n')
  app.use(router.routes())
    .use(router.allowedMethods())
}
