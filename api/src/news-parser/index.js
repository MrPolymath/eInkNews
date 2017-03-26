import Promise from 'bluebird'
import Epub from 'epub-gen'
import kindlegen from 'kindlegen'
// import Nightmare from 'nightmare'
import fs from 'fs'
import tmp from 'tmp'
var scrape = require("website-scraper")

import sources from '../config/sources.json'
import modules from './modules'

const createEbook  = function(params) {
  const { subscriptions } = params
  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth())+1

  const filteredSources = sources.sources.filter(source => {
    return subscriptions.indexOf(source.key) > -1
  })

  // Works with only one domain for now
  const key = filteredSources[0].key
  const url = filteredSources[0].url

  const htmlPath = tmp.tmpNameSync()
  const epubPath = tmp.tmpNameSync()

  return new Promise((resolve, reject) => {
    scrape({
      urls: url,
      directory: htmlPath,
      recursive: false,
      maxDepth: 1
    }).then(() => {
        return new Promise((resolve, reject) => {
          const ebook = String(fs.readFileSync(`${htmlPath}/index.html`, { encoding: 'utf8' }))
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
            const mobiPath = tmp.tmpNameSync()
            kindlegen(fs.readFileSync(epubPath), (err, mobi) => {
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
