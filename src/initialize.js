
import {initialize as intializeAuth} from './login'
import {initialize as initializeWindow} from './components'

export default function initialize () {
  return (dispatch, _, {window}) => {
    dispatch(intializeAuth())
    dispatch(initializeWindow())
  }
}
