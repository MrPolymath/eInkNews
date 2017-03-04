import request from 'superagent'

const asyncCallsToApi = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SEND_FORM':
      request
        .post(action.endpoint)
        .type('form')
        .send({
          email: action.payload.email,
          subscriptions: action.payload.subscriptions
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
    default:
      break
  }
}

export default asyncCallsToApi
