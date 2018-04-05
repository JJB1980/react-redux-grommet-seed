import { fetchUtil } from '../utils'
import { ForgotPasswordState } from './records'

const NS = 'FORGOT_PASSWORD_'

const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const SUBMITTED = `${NS}SUBMITTED`
const SUCCESS = `${NS}SUCESS`
const FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`

const initialState = new ForgotPasswordState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_EMAIL:
      return state.set('email', payload)

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
