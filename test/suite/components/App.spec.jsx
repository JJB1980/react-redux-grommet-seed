import React from 'react'

import GrommetApp from 'grommet/components/App'

import {App} from '../../../src/components/App'

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

  it.skip('should render Login', () => {
    const props = {
      location: {
        pathname: '/login'
      }
    }
    wrapper = shallow(<App props={props} />)
    expect(wrapper.find('Login').exists()).to.be.true()
  })

})
