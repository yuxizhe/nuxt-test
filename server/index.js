import Nuxt from 'nuxt'
import express from 'express'

const requestProxy = require('express-request-proxy')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
// API proxy for cross domain request in baoxian.xueqiu.com
app.all('/api/*', (req, res, next) => {
  var ua = req.headers['user-agent']
  // 为了使后端能得到UA数据
  if (!(ua.match(/iphone/i) || ua.match(/android/i))) {
    ua = 'iPhone ' + ua
  }
  // console.log(ua)
  requestProxy({
    url: 'https://apibaoxian.xueqiu.com/*',
    // url: 'http://apibaoxian.inter.xueqiu.com/*',
    headers: {
      cookie: req.headers.cookie,
      'User-agent': ua
    }
  })(req, res, next)
})

app.all('/xueqiu/*', (req, res, next) => {
  requestProxy({
    url: 'https://xueqiu.com/*',
    headers: {
      cookie: req.headers.cookie
    }
  })(req, res, next)
})

// Start nuxt.js
async function start() {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()

