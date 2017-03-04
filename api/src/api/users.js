import { Router } from 'express'
import User from '../models/User'

let user = Router()

user.post('/', (req, res, next) => {
  if (!req.body.email || !req.body.interests) {
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
      if (user.interests != req.body.interests) {
        user.interests = req.body.interests
        user.save((err) => {
          if (err) return res.json('well this is embarrassing')
          // TODO: Interests have changed, recreate bundle
        })
      }
      return res.json(user.getBundleUrl())
    }
  })
})

export default user
