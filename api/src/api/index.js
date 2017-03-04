import { Router } from 'express'
import users from './users'
import bundles from './bundles'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

api.use('/users', users)
api.use('/bundles', bundles)

export default api
