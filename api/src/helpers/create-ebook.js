import fs from 'fs';
import AWS from 'aws-sdk';
import Promise from 'bluebird'
import htmlToEbook from '../epub-to-html'

const createEbook = function(user) {
  const { id, subscriptions, type } = user
  // Generate epub and upload to S3, but don't wait for it
  // htmlToEbook(subscriptions, type)
  //   .then(() => {
  //     AWS.config.update({ region: process.env.AWS_REGION });
  //     var s3 = new AWS.S3({ signatureVersion: 'v4', params: { Bucket: process.env.S3_BUCKET } });
  //     // TODO: Don't hardcode the filename
  //     fs.readFile('./output.epub', function (err, data){
  //       if (err) throw err
  //       s3.putObject({
  //         Key: `${type}/${id}.${type}`,
  //         Body: data
  //       }, function(err) {
  //         if (err) {
  //           throw err
  //         } else {
  //           console.log('Successfully uploaded.');
  //         }
  //       })
  //     })
  //   })

  htmlToEbook('http://nytimes.com')
  AWS.config.update({ region: process.env.AWS_REGION });
  var s3 = new AWS.S3({ signatureVersion: 'v4', params: { Bucket: process.env.S3_BUCKET } });
  // TODO: Don't hardcode the filename
  fs.readFile('./output.epub', function (err, data){
    if (err) throw err
    s3.putObject({
      Key: `${type}/${id}.${type}`,
      Body: data
    }, function(err) {
      if (err) {
        throw err
      } else {
        console.log('Successfully uploaded.');
      }
    })
  })

  return Promise.resolve(user)
}

export default createEbook
