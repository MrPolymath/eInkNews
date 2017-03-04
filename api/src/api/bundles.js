import { Router } from 'express'
import epubToHtml from '../epub-to-html'

let bundle = Router()

bundle.get('/:userId', (req, res) => {
  // TODO: Return this user's bundle.
  // If it's old, create a new one first.
  epubToHtml('http://nytimes.com')
})

export default bundle
