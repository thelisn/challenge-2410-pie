const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsConfig = require('./config/cors')

let indexRouter = require('./routes/index')

let app = express()
app.use(cors(corsConfig))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true
  }
}))


app.use('/api', indexRouter)

app.use(function(req, res) {
  res.status(400)
  res.json({
    success: false,
    message: 'error'
  })
})

app.use(function(err, req, res) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({
    success: false
  })
})

module.exports = app
