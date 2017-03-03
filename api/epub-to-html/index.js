var Epub = require("epub-gen")

const date = new Date();
const day = date.getDate();
const month = (date.getMonth()) + 1;


var option = {
    title: day + '-' + month + '-' + "New York Times", // *Required, title of the book.
    author: "New York times", // *Required, name of the author.
    publisher: "New York Times", // optional
    cover: "http://www.deportevalenciano.com/files/styles/eht/public/new_york_times_logo_variation.jpg", // Url or File path, both ok.
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "<h2>Charles Lutwidge Dodgson</h2>"
            +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
        },
        {
            title: "Down the Rabbit Hole",
            data: "<p>Alice was beginning to get very tired...</p>"
        }
    ]
};

new Epub(option, "test.epub");
