const fs = require('fs')
const Koa = require('koa')
const app = new Koa()

function jsonpWrapper(callbackName, data) {
  return `${callbackName}(${JSON.stringify(data)})`
}

app.use( async ( ctx ) => {
  let url = ctx.request.url.slice(1) || "index.html"
  switch(url) {
  case 'username':
    ctx.body = jsonpWrapper('callback', {name: 'wanghong'})
    ctx.set("Content-Type", 'application/javascript; charset=UTF-8')
    break
  case 'acao':
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8000")
    ctx.body = JSON.stringify(ctx.request)
    break
  default:
    ctx.set("Content-Type", 'text/html; charset=UTF-8')
    ctx.set('Cache-Control', 'no-cache');
    ctx.set("Set-Cookie", "username=wanghong")
    ctx.body = fs.readFileSync(url)
  }
})

app.listen(3000)