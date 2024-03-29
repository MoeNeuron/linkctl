//imports
const express = require('express')
const app = express()
const connectDB = require('./config/connectDB')
const { body } = require('express-validator')

connectDB()
const port = process.env.port || 8000

app.use(express.json())

//add middleware function for developmenent
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/', require('./routes/api'))
app.use(
  '/api',
  body('longUrl').not().isEmpty().trim().escape(),
  require('./routes/api')
)

app.listen(port, () => {
  console.log(`server alive on port ${port}!`)
})
