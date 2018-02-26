const path = require('path')
const { argv } = require('yargs')
const compression = require('compression')
const express = require('express')

const app = express()
const port = argv.port ? Number(argv.port) : 10001

app.use(compression()) // gzip 压缩

app.use(
  '/wmp',
  express.static('dist', {
    extensions: ['html']
  })
)

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`)
})
