const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

app.use(express.static(path.join(process.cwd(), 'dist')))
app.use(morgan('tiny'))

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

/* serves main page */
app.get('*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log('Listening on ' + port)
})
