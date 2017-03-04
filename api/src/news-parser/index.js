import Promise from 'bluebird'
import Epub from 'epub-gen'
import Nightmare from 'nightmare'
import fs from 'fs'
import tmp from 'tmp'
import sources from '../config/sources.json'

import modules from './modules'

const createEbook  = function(params) {
  const { subscriptions, type } = params

  const nightmare = Nightmare()

  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth())+1

  const filteredSources = sources.sources.filter(source => {
    return subscriptions.indexOf(source.key) > -1
  })

  // Works with only one domain for now
  const key = filteredSources[0].key
  const url = filteredSources[0].value

  const htmlPath = tmp.tmpNameSync()
  const epubPath = tmp.tmpNameSync()

  const promise = new Promise((resolve, reject) => {
    nightmare
      .goto(url)
      .end()
      .html(htmlPath, 'HTMLOnly')
      .then(function () {
        const ebook = fs.readFileSync(htmlPath,{ encoding: 'utf8' }).toString()
        modules()[key](ebook, (content) => {
          const option = {
                title: day + '-' + month + '-' + key,
                author: url,
                publisher: url,
                cover: `${url}/favicon.ico`,
                content: [
                    content.map((i) => {
                        return(
                          `{
                              title: ${i.title} ,
                              data: ${i.text},
                          }, `
                      )
                    })
                ]
            }
          new Epub(option, epubPath).promise.then(function(){
              return resolve(epubPath, params)
           }, function(err){
              return reject(err)
          })
        })
      })
      .catch(function (err) {
        return reject(err)
      })
  })

  return promise
}

export default createEbook
