import { Router } from 'express'
import AWS from 'aws-sdk'
import User from '../models/User'

let bundle = Router()

bundle.get('/:userId', (req, res) => {
  const { userId } = req.params

  User.findOne({ _id: userId }).exec()
    .then(user => {
      const { bundleType } = user
      var s3 = new AWS.S3()
      var params = { Bucket: process.env.S3_BUCKET, Key: `${bundleType}/${userId}.${bundleType}` }
      // TODO: Error checking
      s3.getObject(params).createReadStream().pipe(res)
    })
    .catch(err => {
      return res.json({ message: 'well this is embarrassing', err })
    })
})

export default bundle
