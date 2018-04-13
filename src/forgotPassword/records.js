import { Map, Record } from 'immutable'

export const ForgotPasswordState = new Record({
  email: '',
  password: '',
  token: '',
  submitted: false,
  error: false,
  success: false,
  passwordResetSuccess: false,
  complete: false,
  errors: Map()
}, 'ForgotPasswordState')
