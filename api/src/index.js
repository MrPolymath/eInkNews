import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import './config/db'

import api from './api'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Allow cross domain
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/api', api)

app.listen( process.env.PORT || 3000, function () {
  console.log('Running!')
})
