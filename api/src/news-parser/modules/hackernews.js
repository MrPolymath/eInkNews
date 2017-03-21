var read = require('node-readability');
import Promise from 'bluebird'
import getMatches from '../../helpers/get-matches.js'


const elmundoParser = function(epub){
  return new Promise(function(resolve) {
    //Variables declaration: response array, Regex to get all the articles, Regex to get all article links, and a cleaning sentence to delete some unnecessary links from the ebook
    var final_response = []
    const regex_articles = /<td align="right" valign="top" class="title"><span class="rank"([\s\S]*?)<tr class="spacer" style="height:5px"><\/tr>/g
    const regex_url_article = /<\/div><\/a><\/center><\/td><td class="title"><a href="(.*?)"/g
    const regex_url_article_comments = /\| <a href="(.*?)<\/a> \| <a href="(.*?)">[0-9]*&nbsp;comments<\/a>/g
    const regex_article_titles = /class="storylink"[ a-zA-Z=".]*>(.*?)<\/a><span/g
    const articles = epub.match(regex_articles);
    const articlesUrl = getMatches(articles.join(), regex_url_article, articles.length)
    const articlesUrlComments = getMatches(articles.join(), regex_url_article_comments, articles.length, 2)
    const articlesTitles = getMatches(epub, regex_article_titles, articles.length)
    //TODO: No detecta todas las noticias correctamente
    // console.log(articles[0]);
    // console.log(articlesUrl[0]);
    // console.log(articlesTitles[0]);
    // console.log(articlesUrlComments[0]);
    // creation of a loop which gets the content and title of every article.
    // First of all: Promise.all in order to wait for all articles to finish being parsed , then the url articles array is mapped and each article becomes a Promise
    // When each promise has finished a new content and title is pushed into the final array
    var i = -1;
    Promise.mapSeries(articles, (function() {
      i = i + 1;
      console.log(i);
      return new Promise(function(resolve){
        if(articlesUrl[i] != null){
          let url = articlesUrl[i];
          url.split('//') ? '' : url=`https://news.ycombinator.com/${url}`
          read(url, function(err, page){
            page ? resolve(page.content) : resolve(null)
          })
        }
        else resolve(null)
      })
        .then(function(success){
          let a = i
          if(success != null & success != false & articlesUrlComments[a] != null){
            read('https://news.ycombinator.com/'+articlesUrlComments[a], function(err, page){
              final_response.push({ title: articlesTitles[a], data: success})
              page.content ? final_response.push({ title: 'Comments:'+articlesTitles[a], data:page.content}) : ''
              return true
            })
          }
        })
    }),{concurrency: 1})
    .then(function() {
      console.log('sefini');
      console.log(final_response);
      resolve(final_response)
    })
  })
}



export default elmundoParser
