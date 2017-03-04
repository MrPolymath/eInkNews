/* eslint-disable */
import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultLandingState = {
  email: '',
  subscriptions: [],
  submited: false,
  url: ''
}
const landing = (state = defaultLandingState, action) => {
  const { type, error, payload} = action
  if (type === ActionTypes.SUBSCRIPTION_FORM_SUBMITTED) {
    return merge({}, state, {
      submited: true,
      url: payload.url
    })
  }
  if (type === ActionTypes.ADD_SUBSCRIPTION) {
    let found = false
    let newSubscriptions = []
    state.subscriptions.forEach(function(sub) {
      if (sub.key === payload.key) {
        found = true
      }
    })
    if (found === false) {
      newSubscriptions = [payload, ...state.subscriptions]
    }
    return merge({}, state, {
      subscriptions: newSubscriptions
    })
  }
  if (type === ActionTypes.RECEIVED_URL) {
    return merge({}, state, {
      url: payload.url
    })
  }
  if (type === ActionTypes.DELETE_SUBSCRIPTION) {
    let newSubscriptions = []
    state.subscriptions.forEach(function(sub) {
      if (sub.key !== payload.key) {
        newSubscriptions.push(sub)
      }
    })
    const newState = state
    newState.subscriptions = []
    return merge({}, newState, {
      subscriptions: newSubscriptions
    })
  }

  return state
}

const rootReducer = combineReducers({
  landing,
  routing
})

export default rootReducer
