import React from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter as Router } from 'react-router-dom'

import GrommetApp from 'grommet/components/App'

import {App} from '../../../src/components/App'
import {LoginForm} from '../../../src/login/components/LoginForm'
import configureStore from '../../../src/store'

describe('<App />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should render the GrommetApp', () => {
    expect(wrapper.find(GrommetApp)).to.exist()
  })

  it('should render Header', () => {
    expect(wrapper.find('Header').exists()).to.be.true()
  })

  it('should render Title', () => {
    expect(wrapper.find('Header').html()).to.contain('Sample Title')
  })

  it('should render Split', () => {
    expect(wrapper.find('Split').exists()).to.be.true()
  })

  it('should render Login', () => {
    const props = {
      location: {
        pathname: '/login'
      }
    }
    const store = configureStore()
    const component = <Provider store={store}>
      <Router>
        <App {...props} />
      </Router>
    </Provider>
    wrapper = mount(component)
    expect(wrapper.find(LoginForm).exists()).to.be.true()
  })
})
