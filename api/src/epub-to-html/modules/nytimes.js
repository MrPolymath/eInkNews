var http = require("http");


const nytimesParser = function(epub){
const regex_article = /<h2 class="story-heading"[^>]*>((?:.|\r?\n)*?)<\/h2>/g
const regex_url = /<a href="(.*?).html"/
const regex_title = /.html">(.*?)<\/a>/

const articles = epub.match(regex_article);
var articleUrl = [];
var articleTitle = [];

var counter = 0;
  for (var i = 0; i < articles.length ; i++) {
    if ( regex_url.exec(articles[i]) !== null && regex_title.exec(articles[i]) !== null){
        articleUrl[counter] = regex_url.exec(articles[i])[1].toString().concat('.html');
        articleTitle[counter] = regex_title.exec(articles[i])[1].replace('\n','')
        console.log('web: ',articleUrl[counter], 'titulo: ',articleTitle[counter]);
        counter ++;
      }

    // console.log(articleUrl, i );
    // console.log(articleUrl);
    // http.get({
    //     host: articleUrl,
    //     method: 'GET',
    //    agent: false
    //   }
    // , function(res){
    //   console.log("Got response: " + res.statusCode);
    //  }).on('error', function(e) {
    //    console.log("Got error: " + e.message);
    //  });

      // nightmare
      //   .goto(articleUrl)
      //   .end()
      //   .html(`${i}prueba.html`, 'HTMLOnly')
      //   .catch(function(error) {
      //         console.error('Search failed:', error);
      //     })
        // .then(function(){console.log('hola');})
  }
console.log(counter);
}

// var urls = ['http://example1.com', 'http://example2.com', 'http://example3.com'];
// urls.reduce(function(accumulator, url) {
//   return accumulator.then(function(results) {
//     return nightmare.goto(url)
//       .wait('body')
//       .title()
//       .then(function(result){
//         results.push(result);
//         return results;
//       });
//   });
// }, Promise.resolve([])).then(function(results){
//     console.dir(results);
// });
//
export default nytimesParser;
