import { fetchUtil, EMAIL_REGEX } from '../utils'
import { RegisterState } from './records'
import {getEmail as getLoginEmail} from '../login'

const NS = 'REGISTER_'

const CHANGE_FIRSTNAME = `${NS}CHANGE_FIRSTNAME`
const CHANGE_LASTNAME = `${NS}CHANGE_LASTNAME`
const CHANGE_MOBILE = `${NS}CHANGE_MOBILE`
const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const CHANGE_CONFIRM_PASSWORD = `${NS}CHANGE_CONFIRM_PASSWORD`
const SIGNUP_SUBMITTED = `${NS}SUBMITTED`
const SIGNUP_SUCCESS = `${NS}SUCESS`
const SIGNUP_FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`
const VALID_EMAIL = `${NS}VALID_EMAIL`
const FETCHING = `${NS}FETCHING`
const SET_PROFILE = `${NS}SET_PROFILE`
const PROFILE_UPDATED = `${NS}PROFILE_UPDATED`
const PASSWORD_UPDATED = `${NS}PASSWORD_UPDATED`
const PASSWORD_UPDATE_ERROR = `${NS}PASSWORD_UPDATE_ERROR`

const initialState = new RegisterState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_FIRSTNAME:
      state = state.set('firstname', payload)
      return state.set('complete', complete(state))

    case CHANGE_LASTNAME:
      state = state.set('lastname', payload)
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

    case CHANGE_CONFIRM_PASSWORD:
      return state.set('confirmPassword', payload)

    case SIGNUP_SUBMITTED:
      return state.set('submitted', true)

    case SIGNUP_SUCCESS:
      return state.merge({success: payload, submitted: false, error: null})

    case SIGNUP_FAILURE:
      return state.merge({error: payload, submitted: false, success: false})

    case FETCHING:
      return state.set('fetching', payload)

    case SET_PROFILE:
      const {email, mobile, firstname, lastname} = payload

      state = state.merge({
        email, mobile, firstname, lastname, profileLoaded: true
      })
      return state.set('complete', complete(state))

    case PASSWORD_UPDATED:
      return state.merge({passwordUpdated: payload, passwordUpdateError: false, password: '', confirmPassword: ''})

    case PASSWORD_UPDATE_ERROR:
      return state.merge({passwordUpdateError: payload, passwordUpdated: false})

    case CLEAR_FORM:
      return initialState
      // return state.merge({error: false, submitted: false, success: false})

    default:
      return state
  }
}

function complete (state) {
  if (state.profileLoaded) {
    return state.firstname && state.lastname && state.mobile && state.email
  }
  return state.firstname && state.lastname && state.mobile && state.password && state.email
}

// actions --------------------

export function changeFirstName (firstname) {
  return { type: CHANGE_FIRSTNAME, payload: firstname }
}

export function changeLastName (lastname) {
  return { type: CHANGE_LASTNAME, payload: lastname }
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

export function changeConfirmPassword (password) {
  return { type: CHANGE_CONFIRM_PASSWORD, payload: password }
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

export function fetching (flag) {
  return { type: FETCHING, payload: flag }
}

export function setProfile (profile) {
  return { type: SET_PROFILE, payload: profile }
}

export function setPasswordUpdated (flag) {
  return { type: PASSWORD_UPDATED, payload: flag }
}

export function passordUpdateError (error) {
  return { type: PASSWORD_UPDATE_ERROR, payload: error }
}
// selectors ------------------

function root (state) {
  return state.register
}

export function getFirstName (state) {
  return root(state).firstname
}

export function getLastName (state) {
  return root(state).lastname
}

export function getMobile (state) {
  return root(state).mobile
}

export function getEmail (state) {
  return root(state).email
}

export function getPassword (state) {
  return root(state).password
}

export function getConfirmPassword (state) {
  return root(state).confirmPassword
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

export function isFetching (state) {
  return root(state).fetching
}

export function getErrors (state) {
  return root(state).errors
}

export function getPasswordUpdated (state) {
  return root(state).passwordUpdated
}

export function getPasswordUpdateError (state) {
  return root(state).passwordUpdateError
}

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const {register: {email, password, firstname, lastname, mobile}} = getState()

    dispatch(submitted())

    const response = await dispatch(fetchUtil('user/register', 'POST', {email, password, firstname, lastname, mobile}))
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

    const result = await doValidateEmail(email, dispatch)

    if (result.success) {
      dispatch(validEmail(true))
    } else {
      dispatch(validEmail(false))
    }
  }
}

export async function doValidateEmail (email, dispatch) {
  const response = await dispatch(fetchUtil('user/validateEmail', 'POST', {email}))
  const result = await response.json()

  return result
}

export function fetchProfile () {
  return async (dispatch, getState) => {
    dispatch(fetching(true))

    const result = await dispatch(fetchUtil('user/fetchProfile', 'GET', null))
    const json = await result.json()

    dispatch(fetching(false))
    dispatch(setProfile(json))
  }
}

export function updateProfile () {
  return async (dispatch, getState) => {
    dispatch(fetching(true))

    const state= getState()
    const obj = {
      firstname: getFirstName(state),
      lastname: getLastName(state),
      email: getEmail(state),
      mobile: getMobile(state)
    }

    const result = await dispatch(fetchUtil('user/updateProfile', 'POST', obj))
    const {success, error} = await result.json()

    dispatch(fetching(false))

    if (success) {
      dispatch(setSuccess(true))
    } else {
      dispatch(failure(error))
    }
  }
}

export function updatePassword () {
  return async (dispatch, getState) => {
    dispatch(fetching(true))

    const state = getState()
    const password = getPassword(state)
    const confirmPassword = getConfirmPassword(state)

    const result = await dispatch(fetchUtil('user/updatePassword', 'POST', {password, confirmPassword}))
    const {success, error} = await result.json()

    dispatch(fetching(false))

    if (success) {
      dispatch(setPasswordUpdated(true))
    } else {
      dispatch(passordUpdateError(error))
    }
  }
}
