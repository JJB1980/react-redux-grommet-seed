import { List } from 'immutable'

import { fetchUtil } from '../utils'
import { UsersState, loadUsers } from './records'

const NS = 'USERS_'

const USERS = `${NS}USERS`
const FETCHING = `${NS}FETCHING`
const SUCCESS = `${NS}SUCCESS`
const FAILURE = `${NS}FAILURE`
const CLEAR_FORM = `${NS}CLEAR_FORM`

const initialState = new UsersState()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING:
      return state.set('fetching', payload)

    case SUCCESS:
      return state.set('users', loadUsers(payload))

    case FAILURE:
      return state.merge({users: List(), error: payload})

    case USERS:
      return state.set('users', payload)

    case CLEAR_FORM:
      return initialState

    default:
      return state
  }
}

// actions --------------------

export function success (data) {
  return { type: SUCCESS, payload: data }
}

export function failure (error) {
  return { type: FAILURE, payload: error }
}

export function fetching (flag) {
  return { type: FETCHING, payload: flag }
}

export function setUsers (users) {
  return { type: USERS, payload: users }
}

// selectors ------------------

function root (state) {
  return state.users
}

export function getUsers (state) {
  return root(state).users
}

export function isFetching (state) {
  return root(state).fetching
}

export function getError (state) {
  return root(state).error
}

// thunks -----------

export function sortUsers (ascending, which) {
  return async (dispatch, getState) => {
    const users = getUsers(getState())

    const sortedUsers = users.sort((a, b) => {
      switch (which) {
        case 0:
          return ascending ? a.email < b.email : a.email > b.email

        case 1: {
          const {firstname : a_val} = a
          const {firstname : b_val} = b

          return ascending ? a_val.toUpperCase() < b_val.toUpperCase() : a_val.toUpperCase() > b_val.toUpperCase()
        }
        case 2: {
          const {lastname : a_val} = a
          const {lastname : b_val} = b

          return ascending ? a_val.toUpperCase() < b_val.toUpperCase() : a_val.toUpperCase() > b_val.toUpperCase()
        }
        case 4:
          return ascending ? a.admin < b.admin : a.admin > b.admin
      }
    })

    dispatch(setUsers(sortedUsers))
  }
}

export function fetchUsers () {
  return async (dispatch, getState) => {
    dispatch(fetching(true))

    const response = await dispatch(fetchUtil('user/selectUsers', 'GET', false))
    const {error, success: responseSuccess, data} = await response.json()

    dispatch(fetching(false))

    if (responseSuccess) {
      dispatch(success(data))
    } else {
      dispatch(failure(error))
    }
  }
}
