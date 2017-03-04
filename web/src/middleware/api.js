import request from 'superagent'
require('dotenv').config({silent: true});

const asyncCallsToApi = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SUBMIT_FORM':
      request
        .post(action.endpoint)
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
        .get(process.env.NODE_ENV === 'development' ? 'http://localhost:'+ process.env.PORT + '/api/sources': process.env.API_URL + '/sources')
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
