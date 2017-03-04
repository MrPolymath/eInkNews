// var htmlparser = require("htmlparser2");
// var Nightmare = require('nightmare');
// var nightmare = Nightmare();
//

var htmlparser = require("htmlparser2");





const nytimesParser = function(epub){
var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";

  var handler = new htmlparser.DomHandler(function (error, dom) {
      if (error)
          console.log(error);
      else
          console.log(dom);
  });
  var parser = new htmlparser.Parser(handler);
  parser.write(epub);
  parser.done();
    // var parser = new htmlparser.Parser({
    // onopentag: function(name, attribs){
    //     if(name === "h2" && attribs.class === "story-heading"){
    //
    //         onprocessinginstruction: (<str> name, <str> data)
    //         //dentro noticia interesante, falta coger el link y el titulo
    //         nightmare
    //           .goto(link)
    //           .end()
    //           .html('./noticia.html', 'HTMLOnly')
    //           .then(function () {
    //               const noticia = fs.readFileSync('./noticia.html',{encoding: 'utf8'}).toString();
    //           })
    //     }
    //   },
    // ontext: function(text){
    //     console.log("-->", text);
    // },
    // onclosetag: function(tagname){
    //     if(tagname === "script"){
    //         console.log("That's it?!");
    //     }
    // }
    // }, {decodeEntities: true});
    // parser.write(epub);
    // parser.end();
}
export default nytimesParser;
