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
  default:
    ctx.set("Content-Type", 'text/html; charset=UTF-8')
    ctx.body = fs.readFileSync(url)
  }
})

app.listen(3000)