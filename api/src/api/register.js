import { Router } from 'express'
import User from '../models/User'
import sendEmail from '../helpers/send-email'
import welcomeEmail from '../helpers/emails/welcome'
let registerRoutes = Router()


registerRoutes.post('/', (req, res) => {
  const { email, subscriptions, bundleType , kindleEmail } = req.body;
  const time = new Date();

  if (!email || !subscriptions || !bundleType) {
    res.sendStatus(403)
  }
  User.findOne({'email': email})
    .then((userDB) => {
      if(userDB == null){ //Register new user
        new User({email, subscriptions, bundleType, kindleEmail, registerTime: time, updatedTime: time}).save()
          .then((newUser) => {
            sendEmail(email, welcomeEmail(`https://eink.news/alias/${email}/${newUser._id}`))
              .then(() => {
                res.sendStatus(201)
              })
          })
      }
      else{ // Update user info
        User.update(userDB,{subscriptions: subscriptions, bundleType: bundleType, kindleEmail: kindleEmail, updatedTime: time}, function(err){
          if(err){
            res.sendStatus(400)
          }else{
            res.sendStatus(200)
          }
        })
      }
    })
    .catch(() => {
      return res.sendStatus(400)
    })
})

export default registerRoutes

//400 error nuestro
//403 error del usuario
//200 actualizaccion
//201 nuevo registro
