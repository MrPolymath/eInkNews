var htmlparser = require("htmlparser2");

export const nytimesParser = function(epub){
    //hago parsing del epub y hago que devuelva un objeto, donde cada elemento del objeto tiene un title y un text


    // class = story-heading
}


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
