import { Router } from 'express'
import users from './users'
import bundles from './bundles'
import sources from './sources'
import register from './register'
import alias from './alias'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

api.use('/users', users)
api.use('/bundles', bundles)
api.use('/sources', sources)
api.use('/register', register)
api.use('/alias', alias)

export default api
