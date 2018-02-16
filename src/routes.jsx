import React from 'react'
import { Route } from 'react-router'
import Hello from './hello/components/home'

export default () => {
  return <Route path="/" component={Hello} />
}