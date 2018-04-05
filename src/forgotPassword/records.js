import { Record } from 'immutable'

export const ForgotPasswordState = new Record({
  email: '',
  submitted: false,
  error: false,
  sucess: false
}, 'ForgotPasswordState')
