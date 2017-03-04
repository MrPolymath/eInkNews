var Epub = require("epub-gen")
var Nightmare = require('nightmare');
var nightmare = Nightmare();
var fs = require('fs');
import modules from './modules';
const epubToHtml = function(url) {

  const HTML_PATH = process.env.HTML_PATH;
  const EPUB_PATH = process.env.EPUB_PATH;

  const date = new Date();
  const day = date.getDate();
  const month = (date.getMonth()) + 1;
  const domain2 = url.split('.');
  const domain = domain2[0].split('//')

  nightmare
    .goto(url)
    .end()
    .html(HTML_PATH, 'HTMLOnly')
    .then(function () {
      const ebook = fs.readFileSync(HTML_PATH,{encoding: 'utf8'}).toString();
      modules()[domain[1]](ebook,(content) => {
        var option = {
              title: day + '-' + month + '-' + domain, // *Required, title of the book.
              author: url, // *Required, name of the author.
              publisher: url, // optional
              cover: "http://www" + url + '/favicon.ico', // Url or File path, both ok.
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
          };
        new Epub(option, EPUB_PATH).promise.then(function(){
            console.log("Ebook Generated Successfully!")
         }, function(err){
            console.error("Failed to generate Ebook because of ", err)
        })
      })
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

export default epubToHtml

//
// content ={
//
//     {titulo:
//     texto:}
//
//     {titulo:
//     texto:},
//
//
// }
