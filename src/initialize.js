import {initialize as intializeAuth} from './login'

export default function initialize () {
  return (dispatch) => {
    dispatch(intializeAuth())
  }
}