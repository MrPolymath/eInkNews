import { Router } from 'express'
import AWS from 'aws-sdk'
import Promise from 'bluebird'

import User from '../models/User'
import createEbook from '../news-parser'

let bundleRoutes = Router()

bundleRoutes.get('/:userId', (req, res) => {
  const { userId } = req.params

  User.findOne({ _id: userId }).exec()
    .then(user => {
      const now = new Date()
      // Get bundle age in hours
      const age = Math.floor((now - user.bundleDate) / (1000*60*60))
      // If older than 3 hours, recreate
      if (age >= 3) return createEbook(user)
      return Promise.resolve(user)
    })
    .then(({ id, bundleType }) => {
      // Download ebook from S3
      const s3 = new AWS.S3()
      const params = { Bucket: process.env.S3_BUCKET, Key: `${bundleType}/${id}.${bundleType}` }
      // TODO: Error checking
      s3.getObject(params).createReadStream().pipe(res)
      return Promise.resolve()
    })
    .catch(err => {
      return res.json({ message: 'well this is embarrassing', err })
    })
})

export default bundleRoutes
