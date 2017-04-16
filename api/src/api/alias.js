import { Router } from 'express'
import User from '../models/User'
let aliasRoutes = Router()


aliasRoutes.post('/', (req, res) => {
  const { alias, id, email } = req.body;
  const time = new Date();

  if (!email || !alias || !id) {
    return res.sendStatus(403)
  }
  User.findOne({'email': email})
    .then((userDB) => {
      console.log(userDB);
      if(userDB == null){ //error url, no user registred with that email.
        return res.sendStatus(403)
      }
      else if(userDB._id != id){ //error url, id from url and id from db doesn't match
        console.log("crash");
        return res.sendStatus(403)
      }
      else{
        User.findOne({'alias': alias})
          .then((aliasDB) => {
            if(aliasDB == null){//save new alias
              User.update(userDB,{alias:alias, updatedTime: time}, function(err){
                if(err){
                  return res.sendStatus(400)
                }else{
                  return res.sendStatus(200)
                }
              })
            }else{//already used
              return res.sendStatus(202)
            }
          })
      }
    })
    .catch(() => {
      return res.sendStatus(400)
    })
})

export default aliasRoutes

//400 error nuestro
//403 error del usuario
//200 actualizaccion
//202 ya en uso
