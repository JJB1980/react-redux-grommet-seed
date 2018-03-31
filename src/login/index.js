import {fetchUtil} from '../utils'
import { LoginState } from './records'
import history from '../history'

const NS = 'LOGIN_'

const CHANGE_USERNAME = `${NS}CHANGE_USERNAME`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const LOGIN_SUBMITTED = `${NS}SUBMITTED`
const LOGIN_SUCCESS = `${NS}SUCCESS`
const LOGIN_FAILURE = `${NS}FAILURE`
const SET_TOKEN = `${NS}SET_TOKEN`
const SET_AUTH = `${NS}SET_AUTH`
const INITIALIZING = `${NS}INITIALIZING`

const initialState = new LoginState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_USERNAME:
      return state.set('username', payload)

    case CHANGE_PASSWORD:
      return state.set('password', payload)

    case LOGIN_SUBMITTED:
      return state.set('submitted', true)

    case LOGIN_SUCCESS:
    const {token, isAdmin} = payload
      return state.merge({token, isAdmin, submitted: false, error: null})

    case LOGIN_FAILURE:
      return state.merge({error: payload, submitted: false})

    case SET_TOKEN:
      return state.set('token', payload)

    case INITIALIZING:
      return state.set('initializing', payload)

    default:
      return state
  }
}

// actions --------------------

export function changeUserName (username) {
  return { type: CHANGE_USERNAME, payload: username }
}

export function changePassword (password) {
  return { type: CHANGE_PASSWORD, payload: password }
}

export function submitted () {
  return { type: LOGIN_SUBMITTED }
}

export function failure (response) {
  return { type: LOGIN_FAILURE, payload: response }
}

export function success (token, isAdmin) {
  return { type: LOGIN_SUCCESS, payload: {token, isAdmin} }
}

export function setToken (token) {
  return { type: SET_TOKEN, payload: token }
}

export function setInitializing (state) {
  return { type: INITIALIZING, payload: state }
}

// selectors ------------------

export function getUserName (state) {
  return state.login.name
}

export function getPassword (state) {
  return state.login.name
}

export function getError (state) {
  return state.login.error
}

export function getSubmitted (state) {
  return state.login.submitted
}

export function getToken (state) {
  return state.login.token
}

export function isAdmin (state) {
  return state.login.isAdmin
}

// thunks -----------

export function submit () {
  return async (dispatch, getState, {localStorage}) => {
    const {login: {username, password}} = getState()

    dispatch(submitted())

    const response = await fetchUtil('auth/login', 'POST', '', {email: username, password})
    const {error, token, isAdmin} = await response.json()

    if (error) {
      localStorage.setItem('token', '')
      dispatch(failure(error))
    } else {
      localStorage.setItem('token', token)
      dispatch(success(token, isAdmin))
    }
  }
}

export function initialize () {
  return async (dispatch, getState, {window, localStorage, token}) => {
    const state = getState()

    if (!token) return

    dispatch(setInitializing(true))

    const response = await fetchUtil('auth/authenticate', 'GET', token, false)
    const result = await response.json()
    const {error, authenticated, isAdmin} = result

    dispatch(setInitializing(false))

    if (error) {
      localStorage.setItem('token', '')
      // dispatch(failure(error))
      // history.push('/login')
      window.history.pushState({}, "Login", "/login/error")
      window.location.reload()
    } else {
      localStorage.setItem('token', token)
      dispatch(success(token, isAdmin))
    }
  }
}