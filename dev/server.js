const express = require('express'),
  app = express()

app.use(
  '/v4',
  express.static('dist', {
    extensions: ['html']
  })
)

app.listen(10001, () => {
  console.log('Server is Running at http://localhost:10001')
})
