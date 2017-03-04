import request from 'superagent'
require('dotenv').config({silent: true});
console.log(process.env.API_PORT);

const asyncCallsToApi = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SUBMIT_FORM':
      request
        .post('http://ec2-52-56-164-171.eu-west-2.compute.amazonaws.com/api/users')
        .type('form')
        .send({
          email: action.payload.email,
          subscriptions: action.payload.subscriptions,
          bundleType: action.payload.bundleType
         })
        .end(function(err, res){
          if (err || !res.ok) {
          //  handle error calling API
          } else {
            next({
               type: 'RECEIVED_URL',
               payload: {
                 url: res.body
               }
            })
          }
        }
      )
      break
    case 'GET_SUBS_FROM_DB':
      request
        .get('http://ec2-52-56-164-171.eu-west-2.compute.amazonaws.com/api/sources')
        .end(function(err, res){
          if (err || !res.ok) {
          //  handle error calling API
          } else {
            console.log(res.body);
            next({
               type: 'GOT_SOURCES',
               payload: {
                 sources: res.body.sources
               }
            })
          }
        }
      )
      break
    default:
      break
  }
}

export default asyncCallsToApi
