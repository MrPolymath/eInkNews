const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


const sendEmail = (email, url) => {
  var data = {
    from: 'Eink News <postmaster@eink.news>',
    to: email,
    subject: 'Welcome to Our community',
    text: `From now on you can download every morning your News and Blogs Morning Bundle using this URL:${url}
    If you like this project you can contribute by developing it wiht us in https://github.com/MrPolymath/eink.news`

  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

}

export default sendEmail;
