import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import GrommetMenu from 'grommet/components/Menu'

import MenuItem from './MenuItem'

export function Menu (props) {
  return <GrommetMenu>
    <MenuItem to='/' >Home</MenuItem>
  </GrommetMenu>
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
