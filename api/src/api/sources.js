import { Router } from 'express'
import sources from '../config/sources.json'

let sourceRoutes = Router()

sourceRoutes.get('/', (req, res) => {
  res.json(sources)
})

export default sourceRoutes
