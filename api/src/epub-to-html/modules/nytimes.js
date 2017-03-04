var Nightmare = require('nightmare');


const nytimesParser = function(epub){
var regex = /<h2 class="story-heading"[^>]*>((?:.|\r?\n)*?)<\/h2>/g
var nightmare = Nightmare();
  const articles = epub.match(regex);
  // console.log(articles);

  regex = /<a href="(.*?)"/

  for (var i = 0; i < articles.length; i++) {

    let a = regex.exec(articles[i]);
    if ( a !== null){
      var articleUrl = a[1];
    }
    console.log(articleUrl, i );
    // nightmare
    //   .goto(articleUrl)
    //   .end()
    //   .html(`${i}prueba.html`, 'HTMLOnly')
    //   .wait(2000)
    //   .then(function(){console.log('hola');})
  }
}

export default nytimesParser;
