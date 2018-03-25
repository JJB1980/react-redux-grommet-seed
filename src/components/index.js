import {setToken} from '../login'

// thunks -----------

export function signOut () {
  return (dispatch, _, {localStorage}) => {
    localStorage.setItem('token', '')
    dispatch(setToken(''))
  }
}
