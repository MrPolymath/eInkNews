/* eslint-disable */
import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultLandingState = {
  email: '',
  subscriptions: [],
  submiting: false,
  submited: false,
  url: '',
  device: '',
  sources: []
}
const landing = (state = defaultLandingState, action) => {
  const { type, error, payload} = action
  if (type === ActionTypes.SUBSCRIPTION_FORM_SUBMITTED) {
    return merge({}, state, {
      submiting: true,
      url: payload.url
    })
  }
  if (type === ActionTypes.SUBMIT_FORM) {
    return merge({}, state, {
      submiting: true
    })
  }
  if (type === ActionTypes.GOT_SOURCES) {
    return merge({}, state, {
      sources: payload.sources
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
  if (type === ActionTypes.UPDATE_EMAIL) {
    return merge({}, state, {
      email: payload.email
    })
  }
  if (type === ActionTypes.RECEIVED_URL) {
    return merge({}, state, {
      url: payload.url,
      submited: true,
      submiting: false
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
  if (type === ActionTypes.SELECT_DEVICE) {
    return merge({}, state, {
      device: payload.value
    })
  }
  if (type === ActionTypes.CLOSE_DIALOG) {
    return merge({}, state, {
      submited: false,
      submiting: false
    })
  }

  return state
}

const rootReducer = combineReducers({
  landing,
  routing
})

export default rootReducer
