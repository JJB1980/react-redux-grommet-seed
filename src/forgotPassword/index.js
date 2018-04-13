import { fetchUtil, EMAIL_REGEX } from '../utils'
import { ForgotPasswordState } from './records'
import { doValidateEmail } from '../register'

const NS = 'FORGOT_PASSWORD_'

const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const SUBMITTED = `${NS}SUBMITTED`
const SUCCESS = `${NS}SUCESS`
const RESET_PASSWORD_SUCCESS = `${NS}RESET_PASSWORD_SUCCESS`
const FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`
const VALID_EMAIL = `${NS}VALID_EMAIL`
const SET_TOKEN = `${NS}SET_TOKEN`

const initialState = new ForgotPasswordState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_EMAIL:
      const {errors} = state
      const result = payload.match(EMAIL_REGEX)

      state = state.merge({
        email: payload,
        errors: !result ? errors.set('email', 'Invalid email.') : errors.delete('email')
      })
      return state.set('complete', complete(state))

    case CHANGE_PASSWORD:
      state = state.set('password', payload)

      return state.set('complete', complete(state))

    case SET_TOKEN:
      return state.set('token', payload)

    case VALID_EMAIL:
      return state.set('errors', !payload ? state.errors : state.errors.set('email', 'No account found.'))

    case SUBMITTED:
      return state.set('submitted', payload)

    case SUCCESS:
      return state.merge({success: payload, submitted: false, error: null})

    case RESET_PASSWORD_SUCCESS:
      return state.set('passwordResetSuccess', true)

    case FAILURE:
      return state.merge({error: payload, submitted: false, success: false})

    case CLEAR_FORM:
      return initialState

    default:
      return state
  }
}

function complete (state) {
  return state.email && (state.token ? state.password : true)
}

// actions --------------------

export function changeEmail (email) {
  return { type: CHANGE_EMAIL, payload: email }
}

export function changePassword (password) {
  return { type: CHANGE_PASSWORD, payload: password }
}

export function setToken (token) {
  return { type: SET_TOKEN, payload: token }
}

export function submitted (flag = true) {
  return { type: SUBMITTED, payload: flag }
}

export function failure (response) {
  return { type: FAILURE, payload: response }
}

export function setSuccess () {
  return { type: SUCCESS, payload: true }
}

export function setPasswordResetSuccess () {
  return { type: RESET_PASSWORD_SUCCESS }
}

export function clearForm () {
  return { type: CLEAR_FORM }
}

export function validEmail (flag) {
  return { type: VALID_EMAIL, payload: flag }
}

// selectors ------------------

function root (state) {
  return state.forgotPassword
}

export function getEmail (state) {
  return root(state).email
}

export function getPassword (state) {
  return root(state).password
}

export function getError (state) {
  return root(state).error
}

export function getSubmitted (state) {
  return root(state).submitted
}

export function getSuccess (state) {
  return root(state).success
}

export function getPasswordResetSuccess (state) {
  return root(state).passwordResetSuccess
}

export function isComplete (state) {
  return root(state).complete
}

export function getErrors (state) {
  return root(state).errors
}

export function getToken (state) {
  return root(state).token
}

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const state = getState()
    const email = getEmail(state)

    dispatch(submitted())

    const response = await fetchUtil('user/requestPasswordReset', 'POST', null, {email})
    const result = await response.json()

    if (result.success) {
      dispatch(setSuccess())
    } else {
      dispatch(failure(result.error))
    }
  }
}

export function validateToken (token) {
  return async (dispatch, getState) => {
    dispatch(submitted())
    dispatch(setToken(token))

    const response = await fetchUtil(`user/validateResetPassword/${token}`, 'POST', null, {token})
    const result = await response.json()

    const {success, email, error} = result
    dispatch(submitted(false))

    if (success) {
      dispatch(changeEmail(email))
    } else {
      dispatch(failure(error))
    }
  }
}

export function resetPassword () {
  return async (dispatch, getState) => {
    const state = getState()
    const email = getEmail(state)
    const token = getToken(state)
    const password = getPassword(state)

    dispatch(submitted())

    const response = await fetchUtil(`user/resetPassword/${token}`, 'POST', null, {email, password})
    const result = await response.json()

    const {success, error} = result
    dispatch(submitted(false))

    if (success) {
      dispatch(setPasswordResetSuccess())
    } else {
      dispatch(failure(error))
    }
  }
}

export function validateEmail (email) {
  return async (dispatch, getState) => {
    dispatch(changeEmail(email))

    const result = await doValidateEmail(email)

    if (result.success) {
      dispatch(validEmail(true))
    } else {
      dispatch(validEmail(false))
    }
  }
}
