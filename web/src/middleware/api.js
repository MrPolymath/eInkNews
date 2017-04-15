import request from 'superagent'

const asyncCallsToApi = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SUBMIT_FORM':
      request
        .post('http://localhost:3001/register')
        .type('form')
        .send({
          email: action.payload.email,
          subscriptions: action.payload.subscriptions,
          bundleType: action.payload.bundleType,
          kindleEmail: action.payload.kindleEmail
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
        .get('http://localhost:3001/sources')
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
export function updateNickname(email, id, nickname){
  var that = this;
  request
    .post('http://localhost:3001/alias')
    .type('form')
    .send({
      email: email,
      id: id,
      nickname: nickname
     })
    .end(function(err, res){
      that.setState({response: res.statusCode})
    }
  )

}
export default asyncCallsToApi
