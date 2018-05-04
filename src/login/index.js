import { fetchUtil } from '../utils'
import { LoginState } from './records'

import { resizeWindow } from '~/src/components'

const NS = 'LOGIN_'

const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const SUBMITTED = `${NS}SUBMITTED`
const SUCCESS = `${NS}SUCCESS`
const FAILURE = `${NS}FAILURE`
const SET_TOKEN = `${NS}SET_TOKEN`
const INITIALIZING = `${NS}INITIALIZING`
const CLEAR_FORM = `${NS}CLEAR_FORM`
const EMAIL_ERROR = `${NS}EMAIL_ERROR`
const FIRSTNAME = `${NS}FIRSTNAME`
const LASTNAME = `${NS}LASTNAME`

const initialState = new LoginState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_EMAIL:
      state = state.set('email', payload)
      return state.set('complete', complete(state))

    case CHANGE_PASSWORD:
      state = state.set('password', payload)
      return state.set('complete', complete(state))

    case SUBMITTED:
      return state.set('submitted', true)

    case SUCCESS:
      const {token, isAdmin, firstname, lastname} = payload

      return state.merge({token, isAdmin, firstname, lastname, submitted: false, error: null})

    case FAILURE:
      return state.merge({error: payload, submitted: false})

    case SET_TOKEN:
      return state.set('token', payload)

    case INITIALIZING:
      return state.set('initializing', payload)

    case EMAIL_ERROR:
      return state.set('emailError', true)

    case FIRSTNAME:
      return state.set('firstname', payload)

    case LASTNAME:
      return state.set('lastname', payload)

    case CLEAR_FORM:
      // return state.merge({error: false, submitted: false})
      return initialState

    default:
      return state
  }
}

function complete ({email, password}) {
  return email && password
}

// actions --------------------

export function changeEmail (email) {
  return { type: CHANGE_EMAIL, payload: email }
}

export function changePassword (password) {
  return { type: CHANGE_PASSWORD, payload: password }
}

export function submitted () {
  return { type: SUBMITTED }
}

export function failure (response) {
  return { type: FAILURE, payload: response }
}

export function success (token, isAdmin, firstname, lastname) {
  return { type: SUCCESS, payload: {token, isAdmin, firstname, lastname} }
}

export function setToken (token) {
  return { type: SET_TOKEN, payload: token }
}

export function setInitializing (state) {
  return { type: INITIALIZING, payload: state }
}

export function clearForm (state) {
  return { type: CLEAR_FORM }
}

export function emailError () {
  return { type: EMAIL_ERROR }
}

// selectors ------------------

function root (state) {
  return state.login
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

export function getToken (state) {
  return root(state).token
}

export function isAdmin (state) {
  return root(state).isAdmin
}

export function isComplete (state) {
  return root(state).complete
}

export function isInitializing (state) {
  return root(state).initializing
}

export function getFirstname (state) {
  return root(state).firstname
}

export function getLastname (state) {
  return root(state).lastname
}


// thunks -----------

export function submit () {
  return async (dispatch, getState, {localStorage}) => {
    const {login: {email, password}} = getState()

    dispatch(submitted())

    const response = await dispatch(fetchUtil('auth/login', 'POST', {email, password}))
    const {error, token, isAdmin, firstname, lastname} = await response.json()

    if (error) {
      localStorage.setItem('token', '')
      dispatch(failure(error))
    } else {
      localStorage.setItem('token', token)
      dispatch(success(token, isAdmin, firstname, lastname))
      dispatch(setToken(token))
    }
  }
}

export function initialize () {
  return async (dispatch, getState, {window, localStorage, getToken}) => {
    const token = getToken()
    if (!token) return

    dispatch(setToken(token))
    dispatch(setInitializing(true))

    const response = await dispatch(fetchUtil('auth/authenticate', 'GET', false))
    const {error, isAdmin, firstname, lastname} = await response.json()

    dispatch(setInitializing(false))

    if (error) {
      localStorage.setItem('token', '')
      // dispatch(failure(error))
      // history.push('/login')
      window.history.pushState({}, 'Login', '/login/error')
      window.location.reload()
    } else {
      localStorage.setItem('token', token)
      dispatch(success(token, isAdmin, firstname, lastname))
    }
  }
}

export function signOut () {
  return (dispatch, _, {localStorage}) => {
    localStorage.setItem('token', '')
    dispatch(setToken(''))
  }
}
