import React from 'react'
import { Route, Link } from 'react-router-dom'

import Hello from './hello/components/home'
import LoginForm from './login/components/LoginForm'

const Home = (props) => {
  console.log(props.match.params.arg1)
  return <div>
    <div>Home</div>
    <Link to='/login'>Login</Link>
  </div>
}

export default () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/test/:arg1' component={Home} />
      <Route exact path='/hello' component={Hello} />
      <Route exact path='/resetPassword' component={Home} />
      <Route exact path='/resetPassword/:token' component={Home} />
      <Route exact path='/login' component={Home} />
      <Route exact path='/login/error' component={Home} />
      <Route exact path='/signup' component={Home} />
    </div>
  )
}
