const index = async(ctx, next) => {
  await ctx.render('home/index', { title: 'iKcamp欢迎您' })
}

const home = async(ctx, next) => {
  console.log(ctx.request.query)
  console.log(ctx.request.querystring)
  ctx.response.body = '<h1>HOME page</h1>'
}

const homeParams = async(ctx, next) => {
  console.log(ctx.params)
  ctx.response.body = '<h1>HOME page /:id/:name</h1>'
}

const login = async(ctx, next) => {
  await ctx.render('home/login', {
    btnName: 'GoGoGo'
  })
}

const register = async(ctx, next) => {
  const { app } = ctx
  const params = ctx.request.body
  const name = params.name
  const password = params.password
  const res = await app.service.home.register(name, password)
  if (res.status === '-1') {
    await ctx.render('home/login', res.data)
  } else {
    ctx.state.title = '个人中心'
    await ctx.render('home/success', res.data)
  }
}

module.exports = {
  'GET /': index,
  'GET /home': home,
  'GET /home/:id/:name': homeParams,
  'GET /user': login,
  'POST /user/register': register
}
