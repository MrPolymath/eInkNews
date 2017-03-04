import mongoose from 'mongoose'
import Promise from 'bluebird'

mongoose.Promise = Promise

const { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env

const mongoUri = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`

mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})
