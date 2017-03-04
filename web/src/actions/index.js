export const SUBMIT_FORM = 'SUBMIT_FORM'
export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const RECEIVED_URL = 'RECEIVED_URL'

export const submitForm = (email, subscriptions) => {
  return {
    type: SUBMIT_FORM,
    payload: {
      email: email,
      subscriptions: subscriptions
    }
  }
}

export const addSubscription = (event, index, value) => {
  return {
    type: ADD_SUBSCRIPTION,
    payload: {
      key: index,
      value: value
    }
  }
}

export const deleteSubscription = (key) => {
  return {
    type: DELETE_SUBSCRIPTION,
    payload: {
      key: key
    }
  }
}
