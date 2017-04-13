const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
import Promise from 'bluebird'

const sendEmail = (email, content) => {
  return new Promise((resolve) => {
    var data = {
      from: 'Eink News <postmaster@eink.news>',
      to: email,
      subject: `${content.subject}`,
      html: `${content.html}`
    };
    mailgun.messages().send(data, function (error, body) {
      if (error){
        console.log(error);
        resolve(false);
      }
      console.log(body);
      resolve(true)
    });

  })
}


export default sendEmail;
