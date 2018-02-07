const path = require('path')
const express = require('express'),
  app = express()

app.use(
  '/v4',
  express.static('dist', {
    extensions: ['html']
  })
)

// app.get('*', function (request, response){
//   console.log(request)
//   response.sendFile(path.resolve(__dirname, '../dist', `${request.originalUrl.split('/')[2]}.html`))
// })

app.listen(10001, () => {
  console.log('Server is Running at http://localhost:10001')
})
