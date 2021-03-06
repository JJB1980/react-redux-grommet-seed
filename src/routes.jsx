import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Box from 'grommet/components/Box'
import { Helmet } from 'react-helmet'

import Hello from './hello/components/home'
import Profile from './register/components/Profile'
import UsersForm from './users/components/Users'

const Home = (props) => {
  console.log(props.match.params.arg1)
  return <div>
    <Helmet><title>Home</title></Helmet>
    <Box align='center'>Home</Box>
  </div>
}

export default function Routes (props) {
  const {isAdmin} = props

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/test/:arg1' component={Home} />
      <Route exact path='/hello' component={Hello} />
      <Route exact path='/profile' component={Profile} />
      {isAdmin && <Route exact path='/users' component={UsersForm} />}
      <Route nomatch component={() => <Box align='center'>404</Box>} />
    </Switch>
  )
}
