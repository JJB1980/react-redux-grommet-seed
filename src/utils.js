import fetch from 'cross-fetch'

import {development} from './config.json'

export const EMAIL_REGEX = /\S+@\S+\.\S+/

export function location (props, route) {
  const {location} = props

  return location && location.pathname && location.pathname.match(route)
}

export function fetchUtil (uri, method, token, body) {
  return fetch(`${development.host}${uri}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: body ? JSON.stringify(body) : null
  })
}

export function bindDom (callback) {
  return (event) => {
    return callback(event.target.value)
  }
}
