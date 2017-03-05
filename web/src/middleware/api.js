import request from 'superagent'

const asyncCallsToApi = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SUBMIT_FORM':
      request
        .post('https://api.eink.news/users')
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
        .get('https://api.eink.news/sources')
        .end(function(err, res){
          if (err || !res.ok) {
          //  handle error calling API
          } else {
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
