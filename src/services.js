import {development, production} from './config.json'

const environment = process.env.NODE_ENV || 'production'

export function config () {
  return environment !== 'production' ? development : production
}

export default {
  getToken: () => window.localStorage.getItem('token'),
  window,
  localStorage: window.localStorage,
  config: config(),
  environment
}
