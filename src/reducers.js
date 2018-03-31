import { combineReducers } from 'redux'
import hello from './hello'
import login from './login'
import signup from './signup'

export default combineReducers({
  hello,
  login,
  signup
})
