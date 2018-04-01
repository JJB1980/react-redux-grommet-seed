import { Record } from 'immutable'

export const SignUpState = new Record({
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  password: '',
  submitted: false,
  error: null,
  success: null
}, 'SignUpState')
