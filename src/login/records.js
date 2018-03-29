import { Record } from 'immutable'

export const LoginState = new Record({
  initializing: false,
  username: '',
  password: '',
  submitted: false,
  error: null,
  isAdmin: false,
  token: localStorage.getItem('token')
}, 'LoginState')
