import { Router } from 'express'

import User from '../models/User'
import createEbook from '../news-parser'
import uploadToS3 from '../helpers/upload-to-s3'
import sendEmail from '../helpers/send-email'
import welcomeEmail from '../helpers/emails/welcome.js'

const userRoutes = Router()

userRoutes.post('/', (req, res) => {
  const { email, subscriptions, bundleType } = req.body;
  if (!email || !subscriptions || !bundleType) {
    return res.json('One or more parameters are missing.')
  }

  User.findOne({ email })
    .then(user => {
      if (user == null) {
        console.log(`Found user with email ${email}`);
        const newUser = new User({
          email,
          subscriptions,
          bundleType,
          bundleDate: new Date()
        })
        user = newUser;
      } else {
        console.log(`User with email ${email} not found, creating a new one`);
        if (user.subscriptions != subscriptions) {
          user.subscriptions = subscriptions
          user.bundleDate = new Date()
        }
        if (user.bundleType != bundleType) {
          user.bundleType = bundleType
          user.bundleDate = new Date()
        }
      }
      user
        .save()
        .then(user => {
          console.log('Creating ebook');
          return createEbook(user)
        })
        .then(ebookPath => {
          console.log('Uploading to S3');
          return uploadToS3(ebookPath, user)
        })
        .then(user => {
          console.log('Returning URL')
          res.json(user.getBundleUrl())
        })
        .then(() => {
          let content = welcomeEmail(user.getBundleUrl())
          console.log('Sending email')
          sendEmail(email, content)
        })
    })
    .catch(err => {
      return res.json({ message: 'well this is embarrassing', err })
    })
})

export default userRoutes
