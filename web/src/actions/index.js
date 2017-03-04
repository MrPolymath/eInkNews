export const SUBMIT_FORM = 'SUBMIT_FORM'
export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const SELECT_DEVICE = 'SELECT_DEVICE'
export const RECEIVED_URL = 'RECEIVED_URL'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export const submitForm = (email, subscriptions, device) => {
  const bundleType = device === 'Kindle' ? 'mobi' : 'epub'
  const parsedSubscriptions = subscriptions.map((sub) => (
    sub.key
  ))
  return {
    type: SUBMIT_FORM,
    payload: {
      email: email,
      subscriptions: parsedSubscriptions,
      bundleType: bundleType
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

export const selectDevice = (event, index, value) => {
  return {
    type: SELECT_DEVICE,
    payload: {
      key: index,
      value: value
    }
  }
}

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG
  }
}
