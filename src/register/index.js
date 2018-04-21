import { fetchUtil, EMAIL_REGEX } from '../utils'
import { RegisterState } from './records'

const NS = 'REGISTER_'

const CHANGE_FIRSTNAME = `${NS}CHANGE_FIRSTNAME`
const CHANGE_LASTNAME = `${NS}CHANGE_LASTNAME`
const CHANGE_MOBILE = `${NS}CHANGE_MOBILE`
const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const SIGNUP_SUBMITTED = `${NS}SUBMITTED`
const SIGNUP_SUCCESS = `${NS}SUCESS`
const SIGNUP_FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`
const VALID_EMAIL = `${NS}VALID_EMAIL`


const initialState = new RegisterState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_FIRSTNAME:
      state = state.set('firstName', payload)
      return state.set('complete', complete(state))

    case CHANGE_LASTNAME:
      state = state.set('lastName', payload)
      return state.set('complete', complete(state))

    case CHANGE_MOBILE:
      state = state.set('mobile', payload)
      return state.set('complete', complete(state))

    case CHANGE_EMAIL:
      const {errors} = state
      const result = payload.match(EMAIL_REGEX)

      state = state.merge({
        email: payload,
        errors: !result ? errors.set('email', 'Invalid email.') : errors.delete('email')
      })
      return state.set('complete', complete(state))

    case VALID_EMAIL:
      return state.set('errors', payload ? state.errors : state.errors.set('email', 'Email already in use.'))

    case CHANGE_PASSWORD:
      state = state.set('password', payload)
      return state.set('complete', complete(state))

    case SIGNUP_SUBMITTED:
      return state.set('submitted', true)

    case SIGNUP_SUCCESS:
      return state.merge({success: payload, submitted: false, error: null})

    case SIGNUP_FAILURE:
      return state.merge({error: payload, submitted: false, success: false})

    case CLEAR_FORM:
      return state.merge({error: false, submitted: false, success: false})

    default:
      return state
  }
}

function complete (state) {
  return state.firstName && state.lastName && state.mobile && state.password && state.email
}

// actions --------------------

export function changeFirstName (firstName) {
  return { type: CHANGE_FIRSTNAME, payload: firstName }
}

export function changeLastName (lastName) {
  return { type: CHANGE_LASTNAME, payload: lastName }
}

export function changeMobile (mobile) {
  return { type: CHANGE_MOBILE, payload: mobile }
}

export function changeEmail (email) {
  return { type: CHANGE_EMAIL, payload: email }
}

export function validEmail (flag) {
  return { type: VALID_EMAIL, payload: flag }
}

export function changePassword (password) {
  return { type: CHANGE_PASSWORD, payload: password }
}

export function submitted () {
  return { type: SIGNUP_SUBMITTED }
}

export function failure (response) {
  return { type: SIGNUP_FAILURE, payload: response }
}

export function setSuccess () {
  return { type: SIGNUP_SUCCESS, payload: true }
}

export function clearForm () {
  return { type: CLEAR_FORM }
}

// selectors ------------------

function root (state) {
  return state.register
}

export function getFirstName (state) {
  return root(state).firstName
}

export function getLastName (state) {
  return root(state).lastName
}

export function getMobile (state) {
  return root(state).mobile
}

export function getEmail (state) {
  return root(state).email
}

export function getPassword (state) {
  return root(state).name
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
    const {register: {email, password, firstName, lastName, mobile}} = getState()

    dispatch(submitted())

    const response = await dispatch(fetchUtil('user/register', 'POST', {email, password, firstName, lastName, mobile}))
    const {error, success} = await response.json()

    if (!success) {
      dispatch(failure(error))
    } else {
      dispatch(setSuccess())
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

export async function doValidateEmail (email) {
  const response = await dispatch(fetchUtil('user/validateEmail', 'POST', {email}))
  const result = await response.json()

  return result
}
