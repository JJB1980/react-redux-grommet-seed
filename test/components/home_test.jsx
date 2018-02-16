import React from 'react'
import Home from '../../src/components/home'
import { shallowComponent } from '../react_utils'

describe('./components/home', () => {
  describe('.render', () => {
    it('must render correctly', () => {
      const el = <Home name="garry" onNameChange={() => {}} />
      const rendered = (<div>
        <input type="text" onChange={() => {}} />
        <p>Hello garry</p>
      </div>)

      shallowComponent(el).must.be.jsx(rendered)
    })
  })
})
