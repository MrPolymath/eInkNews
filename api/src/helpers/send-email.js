const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
console.log(api_key);
console.log(domain);

const sendEmail = (email, url) => {
  var data = {
    from: 'Eink News <postmaster@eink.news>',
    to: email,
    subject: 'Welcome to Our community',
    text: `From now on you can download every morning your News and Blogs Morning Bundle using this URL:</br>${url}</br>
    If you like this project don't hesitate to contribute at https://github.com/eink-news/eink.news`

  };

  mailgun.messages().send(data, function (error, body) {
    if (error) throw error;
    console.log(body);
  });

}

export default sendEmail;
