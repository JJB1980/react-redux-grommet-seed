import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, hashHistory } from 'react-router-dom'

import App from './components/App'
import configureStore from './store'

import './styles.scss'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
), document.getElementById('app'))
