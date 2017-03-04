import jsdom from 'jsdom'
import Promise from 'bluebird'

function getArticleContent(article) {
  const promise = new Promise((resolve) => {
    jsdom.env({
      url: article.link,
      scripts: ["http://code.jquery.com/jquery.js"],
      done: function (err, window) {
        var $ = window.$
        var text = ''
        $('.date').nextAll().each(function() {
          if ($(this).next().hasClass('subhead')) {
            text = text + '<h3>' + $(this).next().text() + '</h3>'
          }
          text = text + $(this).html()
        })
        window.close()
        resolve(text)
      }
    })
  })
  return promise
}

const elmundo = function(ebook, callback) {
  jsdom.env(
    ebook,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      var $ = window.$
      var articles = []
      $(".flex__item h3").each(function() {
        var title = $(this).text()
        var link = $(this).find('a').attr('href')
        articles.push({title: title, link: link})
      })
      const articlePromises = articles.map(article => {
        return getArticleContent(article).then(text => {
          article.text = text.split('<h3 class="list-header"><span>')[0]
          delete article.link
          return article
        })
      })
      Promise.all(articlePromises).then(articles => callback(articles))
    }
  )
}

export default elmundo


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
