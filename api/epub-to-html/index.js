var Epub = require("epub-gen")
var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});
// var htmlparser = require("htmlparser2");
var fs = require('fs');

require('dotenv').config()

const HTML_PATH = process.env.HTML_PATH;
const EPUB_PATH = process.env.EPUB_PATH;
const WEBSITE = process.env.WEBSITE;

const date = new Date();
const day = date.getDate();
const month = (date.getMonth()) + 1;

nightmare
  .goto(WEBSITE)
  .end()
  .html(process.env.HTML_PATH, 'HTMLOnly')
  .then(function (result) {
    const ebook = fs.readFileSync(process.env.PATH,{encoding: 'utf8'}).toString();
    var option = {
          title: day + '-' + month + '-' + WEBSITE, // *Required, title of the book.
          author: WEBSITE, // *Required, name of the author.
          publisher: WEBSITE, // optional
          cover: "http://www.deportevalenciano.com/files/styles/eht/public/new_york_times_logo_variation.jpg", // Url or File path, both ok.
          content: [
              {
                  data: ebook // pass html string
              }
          ]
      };
    console.log(ebook);
    new Epub(option, EPUB_PATH).promise.then(function(){
        console.log("Ebook Generated Successfully!")
   	}, function(err){
        console.error("Failed to generate Ebook because of ", err)
    })
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

// var parser = new htmlparser.Parser({
//     onopentag: function(name, attribs){
//         if(name === "script" && attribs.type === "text/javascript"){
//             console.log("JS! Hooray!");
//         }
//     },
//     ontext: function(text){
//         console.log("-->", text);
//     },
//     onclosetag: function(tagname){
//         if(tagname === "script"){
//             console.log("That's it?!");
//         }
//     }
// }, {decodeEntities: true});
// parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
// parser.end();
