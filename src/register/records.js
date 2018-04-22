import { Map, Record } from 'immutable'

export const RegisterState = new Record({
  firstname: '',
  lastname: '',
  mobile: '',
  email: '',
  password: '',
  confirmPassword: '',
  submitted: false,
  error: null,
  success: null,
  complete: false,
  errors: Map(),
  fetching: false,
  passwordUpdated: false,
  passwordUpdateError: null,
  profileLoaded: false
}, 'RegisterState')
