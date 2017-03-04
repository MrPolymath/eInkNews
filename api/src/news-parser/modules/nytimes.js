var fs = require('fs');
var scrape = require("website-scraper");
import Promise from 'bluebird'

const nytimesParser = function(epub){
  return new Promise(function(resolve, reject) {

    const regex_article = /<h2 class="story-heading"[^>]*>((?:.|\r?\n)*?)<\/h2>/g
    const regex_url = /<a href="(.*?).html"/
    const regex_title = /.html">(.*?)<\/a>/
    const regex_final = /<p class="story-body-text story-content(.*?)<\/p>/g

    const articles = epub.match(regex_article);
    var articleUrl = [];
    var articleTitle = [];
    var final_response = [];
    var counter = 0;
      for (var i = 0; i < articles.length ; i++) {
        if ( regex_url.exec(articles[i]) !== null && regex_title.exec(articles[i]) !== null){
            articleUrl[counter] = regex_url.exec(articles[i])[1].toString().concat('.html');
            articleTitle[counter] = regex_title.exec(articles[i])[1].replace('\n','')
            console.log('web: ',articleUrl[counter], 'titulo: ',articleTitle[counter]);
            counter ++;
          }
      }
    console.log(counter);
    var deleteFolderRecursive = function(path) {
          if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
              var curPath = path + "/" + file;
              if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
              } else { // delete file
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(path);
          }
        };
      var html_article = '';
      deleteFolderRecursive('./file')
      articleTitle.map((article,i) => {
      // fs.unlink(`./file${i}.html`)
      scrape({
        urls: [articleUrl[i]],
        directory: `./file/file${i}.html`,
        recursive: false,
        maxDepth: 1
      }).then(function(){
          // console.log(result.match(regex_final));
         html_article = fs.readFileSync(`./file/file${i}.html/index.html`,{encoding: 'utf8'}).toString();
         const p_article = html_article.match(regex_final);
         const p_article_final = p_article.toString()//  console.log(html_article);
          const final_article = '<h1>'+ article +'</h1><br/>'+ p_article_final;
          console.log(final_article);
          final_response = final_response.push({title:article ,data:final_article})
      }).catch(console.log);
    })

  resolve(final_response);

  })
    // console.log("end");

    // resolve(resposta)
  }


export default nytimesParser;
