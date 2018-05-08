const { argv } = require('yargs')
const compression = require('compression')
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()
const port = argv.port ? Number(argv.port) : 10000

app.use(compression()) // gzip 压缩

app.use(
  '/wmp',
  express.static('dist', {
    extensions: ['html']
  })
)

app.use(
  ['/installment', '/macaron', '/risk'],
  proxy({
    target: 'https://test.mall.akulaku.com/',
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost'
  })
)

app.listen(port, () => {
  console.log(`Server-dist is Running at http://localhost:${port}`)
})
