import { combineReducers } from 'redux'
import hello from './hello'
import login from './login'
import register from './register'
import forgotPassword from './forgotPassword'
import users from './users'
import components from './components'

export default combineReducers({
  hello,
  login,
  register,
  forgotPassword,
  users,
  components
})
