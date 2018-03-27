import fetch from 'cross-fetch'

import {development} from './config.json'

export function location (props, route) {
  return props.location && props.location.pathname && props.location.pathname.indexOf(route) >= 0
}

export function fetchUtil (uri, method, body) {
  return fetch(`${development.host}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}