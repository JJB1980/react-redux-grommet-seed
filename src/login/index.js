import {fetchUtil} from '../utils'
import { LoginState } from './records'

const CHANGE_USERNAME = 'CHANGE_USERNAME'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const SET_TOKEN = 'SET_TOKEN'

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
      return state.merge({token: payload, submitted: false, error: null})

    case LOGIN_FAILURE:
      return state.merge({error: payload, submitted: false})

    case SET_TOKEN:
      return state.set('token', payload)

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

export function success (response) {
  return { type: LOGIN_SUCCESS, payload: response }
}

export function setToken (token) {
  return { type: SET_TOKEN, payload: token }
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

// thunks -----------

export function submit () {
  return async (dispatch, getState, {localStorage}) => {
    const {login: {username, password}} = getState()

    dispatch(submitted())

    const response = await fetchUtil('auth/login', 'POST', {email: username, password})
    const {error, token} = await response.json()

    if (error) {
      localStorage.setItem('token', '')
      dispatch(failure(error))
    } else {
      localStorage.setItem('token', token)
      dispatch(success(token))
    }
  }
}
