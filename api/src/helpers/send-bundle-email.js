const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
import Promise from 'bluebird'

const sendBundleEmail = (email, filepath) => {
  return new Promise((resolve) => {
      var data = {
        from: 'Eink News <postmaster@eink.news>',
        to: email,
        subject: `Eink.News bundle`,
        html: `Bundle From Eink.News`,
        attachment: filepath
      };
      mailgun.messages().send(data, function (error, body) {
        if (error){
          console.log(error);
        }
        console.log(body);
        resolve(true)
      });

    })
  }

export default sendBundleEmail;
