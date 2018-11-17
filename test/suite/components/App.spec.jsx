import React from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter as Router } from 'react-router-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Split from 'grommet/components/Split'

import {App} from '~/src/components/App'
import {LoginForm} from '~/src/login/components/LoginForm'
import reducer from '~/src/reducers'
import services from '~/src/services'

const thunkWithExtraArgument = thunk.withExtraArgument(services)
const enhancers = compose(applyMiddleware(thunkWithExtraArgument))
const store = createStore(reducer, enhancers)

describe('<App />', () => {
  const init = (token) => {
    // wrapper = shallow(<App />)
    const props = {
      token,
      location: {
        pathname: '/login'
      }
    }
    const component = <Provider store={store}>
      <Router>
        <App {...props} />
      </Router>
    </Provider>
    return mount(component)
  }

  it('should render the GrommetApp', () => {
    const wrapper = init('abc')
    expect(wrapper.find(GrommetApp).exists()).to.be.true()
  })

  it('should render Header', () => {
    const wrapper = init('abc')
    expect(wrapper.find(Header).exists()).to.be.true()
  })

  it('should render Title', () => {
    const wrapper = init('abc')
    expect(wrapper.find(Header).html()).to.contain('Grommet App')
  })

  it('should render Split', () => {
    const wrapper = init('abc')
    expect(wrapper.find(Split).exists()).to.be.true()
  })

  it('should render Login', () => {
    const wrapper = init('')
    expect(wrapper.find(LoginForm).exists()).to.be.true()
  })
})
