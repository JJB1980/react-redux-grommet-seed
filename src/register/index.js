import { fetchUtil } from '../utils'
import { RegisterState } from './records'
import history from '../history'

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
      state = state.set('email', payload)
      return state.set('complete', complete(state))

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
      return initialState

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

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const {register: {email, password, firstName, lastName, mobile}} = getState()

    dispatch(submitted())

    const response = await fetchUtil('user/register', 'POST', null, {email, password, firstName, lastName, mobile})
    const {error, success} = await response.json()

    if (!success) {
      dispatch(failure(error))
    } else {
      dispatch(setSuccess())
    }
  }
}

export function resetPassword () {
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
