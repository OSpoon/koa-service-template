const axios = require('axios')
const config = require('./../config')
const sha1 = require('sha1')
const urlencode = require('urlencode')

const access_auth = async(ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query
  const token = 'TOKEN'
  const shaStr = sha1([token, timestamp, nonce].sort().join(''))
  if (shaStr === signature) {
    ctx.body = echostr
  } else {
    await ctx.send('验证失败')
  }
}

const access_token = async(ctx, next) => {
  const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.AppID}&secret=${config.AppSecret}`)
  console.log(result.data)
  await ctx.send(result.data)
}

const getcallbackip = async(ctx, next) => {
  const token = ''
  const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=${token}`)
  console.log(result.data)
  await ctx.send(result.data)
}

const authorize = async(ctx, next) => {
  const redirect_uri = urlencode('http://it200.natapp1.cc/wx/redirect')
  const state = '1234567890'
  const scope = 'snsapi_base'
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.AppID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  ctx.response.redirect(url)
}

const redirect = async(ctx, next) => {
  console.log(ctx.query)
  await ctx.send(ctx.query)
}

module.exports = {
  'GET /wx/access_auth': access_auth,
  'GET /wx/access_token': access_token,
  'GET /wx/getcallbackip': getcallbackip,
  'GET /wx/authorize': authorize,
  'GET /wx/redirect': redirect
}
