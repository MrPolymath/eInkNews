import { Router } from 'express'
import sources from '../config/sources.json'

let sourcesRoutes = Router()

sourcesRoutes.get('/', (req, res) => {
  res.json(sources)
})

export default sourcesRoutes
