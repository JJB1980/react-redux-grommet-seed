import {fetchUtil} from '../utils'
import { SignUpState } from './records'
import history from '../history'

const NS = 'SIGNUP_'

const CHANGE_FIRSTNAME = `${NS}CHANGE_FIRSTNAME`
const CHANGE_LASTNAME = `${NS}CHANGE_LASTNAME`
const CHANGE_MOBILE = `${NS}CHANGE_MOBILE`
const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const SIGNUP_SUBMITTED = `${NS}SUBMITTED`
const SIGNUP_SUCCESS = `${NS}SUCESS`
const SIGNUP_FAILURE = `${NS}FAILURE`

const initialState = new SignUpState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_FIRSTNAME:
      return state.set('firstName', payload)

    case CHANGE_LASTNAME:
      return state.set('lastName', payload)

    case CHANGE_MOBILE:
      return state.set('mobile', payload)

    case CHANGE_EMAIL:
      return state.set('email', payload)

    case CHANGE_PASSWORD:
      return state.set('password', payload)

    case SIGNUP_SUBMITTED:
      return state.set('submitted', true)

    case SIGNUP_SUCCESS:
      return state.merge({success: payload, submitted: false, error: null})

    case SIGNUP_FAILURE:
      return state.merge({error: payload, submitted: false})

    default:
      return state
  }
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

// selectors ------------------

export function getFirstName (state) {
  return state.signup.firstName
}

export function getLastName (state) {
  return state.signup.lastName
}

export function getMobile (state) {
  return state.signup.mobile
}

export function getEmail (state) {
  return state.signup.email
}

export function getPassword (state) {
  return state.signup.name
}

export function getError (state) {
  return state.signup.error
}

export function getSubmitted (state) {
  return state.signup.submitted
}

export function getSuccess (state) {
  return state.signup.success
}

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const {signup: {email, password, firstName, lastName, mobile}} = getState()

    dispatch(submitted())

    const response = await fetchUtil('user/signup', 'POST', null, {email, password, firstName, lastName, mobile})
    const {error, success} = await response.json()

    if (!success) {
      dispatch(failure(error))
    } else {
      dispatch(setSuccess())
    }
  }
}
