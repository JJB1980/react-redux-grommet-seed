import React from 'react'
import { Route, Link } from 'react-router-dom'

import Hello from './hello/components/home'
import LoginForm from './login/components/LoginForm'
import RegisterForm from './register/components/Register'
import ForgotPassword from './forgotPassword/components/ForgotPassword'

export default () => {
  return (
    <div>
      <Route exact path='/' component={LoginForm} />
      <Route exact path='/requestResetPassword' component={ForgotPassword} />
      <Route exact path='/resetPassword/:token' component={ForgotPassword} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/login/error' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
    </div>
  )
}
