/* eslint-disable */
import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultLandingState = {
  email: '',
  subscription: [],
  submited: false
}
const landing = (state = defaultLandingState, action) => {
  const { type, error, payload} = action
  if (type === ActionTypes.SUBSCRIPTION_FORM_SUBMITTED) {
    return merge({}, state, {
      submited: true
    })
  }
  return state
}

const rootReducer = combineReducers({
  landing,
  routing
})

export default rootReducer
