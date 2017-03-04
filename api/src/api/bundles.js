import { Router } from 'express'

let bundle = Router()

bundle.get('/:userId', (req, res) => {
  // TODO: Return this user's bundle.
  // If it's old, create a new one first.
})

export default bundle
