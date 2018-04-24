import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import GrommetMenu from 'grommet/components/Menu'

import MenuItem from './MenuItem'

import {isAdmin} from '../login'

export function Menu (props) {
  const {location, admin} = props

  return <GrommetMenu>
    <MenuItem to='/' location={location}>Home</MenuItem>
    {admin && <MenuItem to='/users' location={location}>Users</MenuItem>}
  </GrommetMenu>
}

function mapStateToProps (state) {
  return {
    admin: isAdmin(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu))
