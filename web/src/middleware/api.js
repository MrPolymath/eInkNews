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
          subscriptions: action.subscriptions
         })
        .end(function(err, res){
          if (err || !res.ok) {
          //  handle error calling API
          } else {
            next({
               type: 'ANOTHER_ACTION',
               payload: {
                 link: res.body.link
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
