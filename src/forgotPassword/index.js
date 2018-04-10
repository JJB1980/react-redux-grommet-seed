import { fetchUtil, EMAIL_REGEX } from '../utils'
import { ForgotPasswordState } from './records'
import { doValidateEmail } from '../register'

const NS = 'FORGOT_PASSWORD_'

const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const SUBMITTED = `${NS}SUBMITTED`
const SUCCESS = `${NS}SUCESS`
const FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`
const VALID_EMAIL = `${NS}VALID_EMAIL`

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

    case VALID_EMAIL:
      return state.set('errors', !payload ? state.errors : state.errors.set('email', 'No account found.'))

    case SUBMITTED:
      return state.set('submitted', true)

    case SUCCESS:
      return state.merge({success: payload, submitted: false, error: null})

    case FAILURE:
      return state.merge({error: payload, submitted: false, success: false})

    case CLEAR_FORM:
      return initialState

    default:
      return state
  }
}

function complete (state) {
  return state.email
}

// actions --------------------

export function changeEmail (email) {
  return { type: CHANGE_EMAIL, payload: email }
}

export function submitted () {
  return { type: SUBMITTED }
}

export function failure (response) {
  return { type: FAILURE, payload: response }
}

export function setSuccess () {
  return { type: SUCCESS, payload: true }
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

export function getError (state) {
  return root(state).error
}

export function getSubmitted (state) {
  return root(state).submitted
}

export function getSuccess (state) {
  return root(state).success
}

export function isComplete (state) {
  return root(state).complete
}

export function getErrors (state) {
  return root(state).errors
}

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const state = getState()
    const email = getEmail(state)

    dispatch(submitted())

    const response = await fetchUtil('user/resetPassword', 'POST', null, {email})
    const result = await response.json()

    if (result.success) {
      dispatch(setSuccess())
    } else {
      dispatch(failure(result.error))
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
