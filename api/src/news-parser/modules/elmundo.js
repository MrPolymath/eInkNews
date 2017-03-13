var fs = require('fs')
var scrape = require("website-scraper")
import Promise from 'bluebird'

import deleteFolderRecursive from '../../helpers/delete-folder-recursive'

const elmundoParser = function(epub){
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


export default elmundoParser





// import jsdom from 'jsdom'
// import Promise from 'bluebird'
//
// function getArticleContent(article) {
//   return new Promise((resolve) => {
//     jsdom.env({
//       url: article.link,
//       scripts: ["http://code.jquery.com/jquery.js"],
//       done: function (err, window) {
//         var $ = window.$
//         var text = ''
//         $('.date').nextAll().each(function() {
//           if ($(this).next().hasClass('subhead')) {
//             text = text + '<h3>' + $(this).next().text() + '</h3>'
//           }
//           text = text + $(this).html()
//         })
//         window.close()
//         resolve(text)
//       }
//     })
//   })
// }
//
// const elmundo = function(ebook) {
//   return new Promise((resolve) => {
//     jsdom.env(
//       ebook,
//       ["http://code.jquery.com/jquery.js"],
//       function (err, window) {
//         var $ = window.$
//         var articles = []
//         $(".flex__item h3").each(function() {
//           var title = $(this).text()
//           var link = $(this).find('a').attr('href')
//           articles.push({title: title, link: link})
//         })
//         const articlePromises = articles.map(article => {
//           return getArticleContent(article).then(text => {
//             article.data = text.split('<h3 class="list-header"><span>')[0]
//             delete article.link
//             return article
//           })
//         })
//         Promise.all(articlePromises).then(articles => resolve(articles))
//       }
//     )
//   })
// }
//
// export default elmundo


// const testArticle = {
//   title: 'El testamento de Miguel Boyer: sólo les deja deudas a sus hijos',
//   link: 'http://www.elmundo.es/loc/2017/03/04/58b964ea46163f990b8b4639.html'
// }
//
// getArticleContent(testArticle)

// var array1 = [{title: 'titulo1', link: 'link1'}, {title: 'titulo2', link: 'link2'}, {title: 'titulo3', link: 'link3'}]
// var array2 = [{text: 'text1'}, {text: 'text2'}, {text: 'text3'}]
// var result = merge([], array1, array2)
// console.log(result)
