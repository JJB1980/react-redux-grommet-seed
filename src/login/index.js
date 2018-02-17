import fetch from 'cross-fetch'

import { LoginState } from './records'

const CHANGE_USERNAME = 'CHANGE_USERNAME'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const initialState = new LoginState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_USERNAME:
      return state.set('username', payload.username)
    case CHANGE_PASSWORD:
      return state.set('password', payload.password)
    case LOGIN_SUBMITTED:
      return state.set('submitted', true)
    case LOGIN_SUCCESS:
      return state.merge({response: payload, submitted: false})
    case LOGIN_FAILURE:
      return state.merge({error: payload, submitted: false})
    default:
      return state
  }
}

// actions --------------------

export function changeUserName (username) {
  return { type: CHANGE_USERNAME, payload: { username } }
}

export function changePassword (password) {
  return { type: CHANGE_PASSWORD, payload: { password } }
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

// selectors ------------------

export function getUserName (state) {
  return state.login.name
}

export function getPassword (state) {
  return state.login.name
}

// thunks -----------

export function submit () {
  return async (dispatch, getState) => {
    const {login: {username, password}} = getState()

    dispatch(submitted())

    console.log(username, password)

    const response = await fetch('foo', {
      method: 'POST',
      body: JSON.stringify({username, password})
    })

    console.log(response.status)

    if (response.status !== 200) {
      dispatch(failure(response))
    } else {
      dispatch(success(response))
    }
  }
}
