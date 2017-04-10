import Promise from 'bluebird'
import Epub from 'epub-gen'
import kindlegen from 'kindlegen'
// import Nightmare from 'nightmare'
import fs from 'fs'
import https from 'https'
import http from 'http'

import sources from '../config/sources.json'
import modules from './modules'

const createEbook  = function(params) {

  const { subscriptions, id } = params
  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth())+1

  const filteredSources = sources.sources.filter(source => {
    return subscriptions.indexOf(source.key) > -1
  })

  // Works with only one domain for now
  const key = filteredSources[0].key
  const url = filteredSources[0].url

  console.log(key);
  console.log(url);
  const epubPath = `./${id}.epub`

  return new Promise((resolve, reject) => {
    return new Promise(function(resolve){
      if(url.split('https')){
        https.get(url, (res) => {
          var data = []
          res.on('data', (d) => {
            data.push(d)
          }).on('end', function() {
              const ebook = Buffer.concat(data)
              resolve(ebook.toString())
          })
        }).on('error', (e) => {
          console.error(e)
          resolve(false)
        })
      }
      else{
        http.get(url, (res) => {
          var data = []
          res.on('data', (d) => {
            data.push(d)
          }).on('end', function() {
              const ebook = Buffer.concat(data)
              resolve(ebook.toString())
          })
        }).on('error', (e) => {
          console.error(e)
          resolve(false)
        })
      }
    })
    .then((ebook) => {
        return new Promise((resolve, reject) => {
          console.log(ebook);
          modules()[key](ebook)
            .then((content) => {
              const options = {
                  title: day + '-' + month + '-' + key,
                  author: url,
                  publisher: url,
                  cover: `${url}/favicon.ico`,
                  content
              }
              new Epub(options, epubPath).promise
                .then(function() {
                    return resolve(epubPath)
                 }, function(err) {
                    return reject(err)
                })
            })
        })
      })
      .then((epubPath) => {
        switch(params.bundleType) {
          case 'mobi': {
            const mobiPath = `./${id}.mobi`
            kindlegen(fs.readFileSync(epubPath), (err, mobi) => {
              console.log(mobi);
              fs.writeFile(mobiPath, mobi, (err) => {
                if (err) throw err
                return resolve(mobiPath)
              })
            })
            break
          }
          case 'epub':
          default:
            return resolve(epubPath)
        }
      })
      .catch(function (err) {
        return reject(err)
      })
  })
}

export default createEbook
