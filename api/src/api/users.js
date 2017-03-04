import { Router } from 'express'
import User from '../models/User'
import createEbook from '../helpers/create-ebook'

const user = Router()

user.post('/', (req, res) => {
  const { email, subscriptions, bundleType } = req.body;
  if (!email || !subscriptions || !bundleType) {
    return res.json('you suck')
  }

  User.findOne({ email })
    .then(user => {
      if (user == null) {
        const newUser = new User({ email, subscriptions, bundleType })
        newUser
          .save()
          .then(user => createEbook(user))
          .then(user => res.json(user.getBundleUrl()))
      } else {
        let modified = false
        if (user.subscriptions != subscriptions) {
          user.subscriptions = subscriptions
          modified = true
        }
        if (user.bundleType != bundleType) {
          user.bundleType = bundleType
          modified = true
        }
        if (modified) {
          user
            .save()
            .then(user => createEbook(user))
            .then(user => res.json(user.getBundleUrl()))

        }
      }
    })
    .catch(err => {
      return res.json({ message: 'well this is embarrassing', err })
    })
})

export default user
