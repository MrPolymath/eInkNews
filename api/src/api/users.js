import { Router } from 'express'
import User from '../models/User'

let user = Router()

user.post('/', (req, res, next) => {
  if (!req.body.email) {
    return res.json('you suck')
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user == null) {
      const newUser = new User({
        email: req.body.email
      })
      newUser.save()
        .then(savedUser => {
          // TODO: Create first bundle
          return res.json(savedUser.getBundleUrl())
        })
        .catch(e => next(e));
    } else {
      return res.json(user.getBundleUrl())
    }
  })
})

export default user
