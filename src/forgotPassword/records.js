import { Map, Record } from 'immutable'

export const ForgotPasswordState = new Record({
  email: '',
  submitted: false,
  error: false,
  success: false,
  complete: false,
  errors: Map()
}, 'ForgotPasswordState')
