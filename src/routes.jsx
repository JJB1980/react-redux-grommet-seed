import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Hello from './hello/components/home'
import LoginForm from './login/components/LoginForm'

const Home = () => <div>Home</div>

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="hello" component={Hello} />
      <Route path="login" component={LoginForm} />
    </Route>
  )
}