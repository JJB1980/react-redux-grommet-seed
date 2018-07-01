import fetch from 'cross-fetch'

export const EMAIL_REGEX = /\S+@\S+\.\S+/

export function location (props, route) {
  const {location} = props

  return location && location.pathname && location.pathname.match(route)
}

export function fetchUtil (uri, method, body = false) {
  return async (dispatch, getState, {getToken, config}) => {
    const token = getToken()
    console.log(uri, method, !!token, body)
    return fetch(`${config.host}${uri}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: body ? JSON.stringify(body) : null
    })
  }
}

export function bindDom (callback) {
  return (event) => {
    return callback(event.target.value)
  }
}

export function bindSubmit (callback) {
  return (event) => {
    event.preventDefault()
    return callback()
  }
}
