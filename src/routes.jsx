import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Hello from './hello/components/home'
import Profile from './register/components/Profile'

const Home = (props) => {
  console.log(props.match.params.arg1)
  return <div>
    <Helmet><title>Home</title></Helmet>
    <div>Home</div>
  </div>
}

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/test/:arg1' component={Home} />
      <Route exact path='/hello' component={Hello} />
      <Route exact path='/profile' component={Profile} />
      <Route nomatch component={() => <div>404</div>} />
    </Switch>
  )
}
