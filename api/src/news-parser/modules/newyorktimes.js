var fs = require('fs')
var scrape = require("website-scraper")
import Promise from 'bluebird'

import deleteFolderRecursive from '../../helpers/delete-folder-recursive'

const nytimesParser = function(epub){
  return new Promise(function(resolve, reject) {
    const regex_article = /<h2 class="story-heading"[^>]*>((?:.|\r?\n)*?)<\/h2>/g
    const regex_url = /<a href="(.*?).html"/
    const regex_title = /.html">(.*?)<\/a>/
    const regex_final = /<p class="story-body-text story-content(.*?)<\/p>/g

    const articles = epub.match(regex_article)
    var articleUrl = []
    var articleTitle = []
    var final_response = []
    var counter = 0
    for (var i = 0; i < articles.length;  i++) {
      if (regex_url.exec(articles[i]) !== null && regex_title.exec(articles[i]) !== null) {
          articleUrl[counter] = regex_url.exec(articles[i])[1].toString().concat('.html')
          articleTitle[counter] = regex_title.exec(articles[i])[1].replace('\n','')
          counter++
        }
    }

    // TODO: Te algun sentit fer-ho així? guardar, llegir, borrar? No és millor directament fer una request i llegir el body?
    var html_article = ''
    deleteFolderRecursive('./file')
    const articlePromises = articleTitle.map((article, i) => {
      return scrape({
        urls: [articleUrl[i]],
        directory: `./file/file${i}.html`,
        recursive: false,
        maxDepth: 1
      })
        .then(function(){
          html_article = fs.readFileSync(`./file/file${i}.html/index.html`,{ encoding: 'utf8' }).toString()
          const p_article = html_article.match(regex_final)
          const p_article_final = p_article ? p_article.join('') : ''
          final_response.push({ title: article, data: p_article_final })
        })
        .catch(function (err) {
          return reject(err)
        })
    })
    Promise.all(articlePromises).then(() => resolve(final_response))
  })
}


export default nytimesParser
