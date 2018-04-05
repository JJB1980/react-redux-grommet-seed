import { Record } from 'immutable'

export const RegisterState = new Record({
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  password: '',
  submitted: false,
  error: null,
  success: null,
  complete: false
}, 'RegisterState')
