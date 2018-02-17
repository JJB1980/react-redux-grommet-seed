import { Record } from 'immutable'

export const LoginState = new Record({
  username: '',
  password: '',
  submitted: false,
  error: false,
  response: null
}, 'LoginState')
