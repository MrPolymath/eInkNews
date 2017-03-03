import { Router } from 'express'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

export default api
