import { mapStateToProps } from '../../src/containers/main'

describe('./containers/main', () => {
  describe('.mapStateToProps', () => {
    it('must return correct props from state', () => {
      const state = { hello: { name: 'garry' } }
      mapStateToProps(state).name.must.eql('garry')
    })
  })
})
