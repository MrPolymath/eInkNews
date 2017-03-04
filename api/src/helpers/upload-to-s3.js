import fs from 'fs'
import AWS from 'aws-sdk'
import Promise from 'bluebird'

const uploadToS3 = (ebookPath, params) => {
  const { id, type } = params
  const promise = new Promise((resolve, reject) => {
    AWS.config.update({ region: process.env.AWS_REGION });
    var s3 = new AWS.S3({ signatureVersion: 'v4', params: { Bucket: process.env.S3_BUCKET } });
    fs.readFile(ebookPath, function (err, data){
      if (err) return reject(err)
      s3.putObject({
        Key: `${type}/${id}.${type}`,
        Body: data
      }, function(err) {
        if (err) {
          return reject(err)
        } else {
          return resolve(params)
        }
      })
    })
  })

  return promise
}

export default uploadToS3
