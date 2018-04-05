import { createSelector } from 'reselect'

import {fetchUtil} from '../utils'
import { LoginState } from './records'
import history from '../history'
// import { getEmail } from '../register';

const NS = 'LOGIN_'

const CHANGE_EMAIL = `${NS}CHANGE_EMAIL`
const CHANGE_PASSWORD = `${NS}CHANGE_PASSWORD`
const LOGIN_SUBMITTED = `${NS}SUBMITTED`
const LOGIN_SUCCESS = `${NS}SUCCESS`
const LOGIN_FAILURE = `${NS}FAILURE`
const SET_TOKEN = `${NS}SET_TOKEN`
const SET_AUTH = `${NS}SET_AUTH`
const INITIALIZING = `${NS}INITIALIZING`
const CLEAR_FORM = `${NS}CLEAR_FORM`

const initialState = new LoginState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_EMAIL:
      state = state.set('email', payload)
      return state.set('isComplete', complete(state))

    case CHANGE_PASSWORD:
    state = state.set('password', payload)
    return state.set('isComplete', complete(state))

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

    case CLEAR_FORM:
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

export function clearForm (state) {
  return { type: CLEAR_FORM }
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
  return root(state).isComplete
}

// thunks -----------

export function submit () {
  return async (dispatch, getState, {localStorage}) => {
    const {login: {email, password}} = getState()

    dispatch(submitted())

    const response = await fetchUtil('auth/login', 'POST', null, {email, password})
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