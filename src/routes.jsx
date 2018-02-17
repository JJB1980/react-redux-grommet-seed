import React from 'react'
import {Route, Link } from 'react-router-dom'

import Hello from './hello/components/home'
import LoginForm from './login/components/LoginForm'

const Home = (props) => {
  console.log(props.match)
  return <div>
    <div>Home</div>
    <Link to="/login">Login</Link>
  </div>
}

export default () => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/test/:arg1" component={Home}/>
      <Route exact path="/hello" component={Hello} />
      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}