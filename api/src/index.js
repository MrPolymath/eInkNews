import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

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

// connect to mongo db
const mongoUri = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.use('/api', api)

app.listen( process.env.PORT || 3000, function () {
  console.log('Running!')
})
