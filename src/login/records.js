import { Record } from 'immutable'

export const LoginState = new Record({
  username: '',
  password: '',
  submitted: false,
  error: null,
  token: localStorage.getItem('token')
}, 'LoginState')
