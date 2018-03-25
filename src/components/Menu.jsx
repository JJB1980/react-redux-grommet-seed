import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import GrommetMenu from 'grommet/components/Menu'
import { Link } from 'react-router-dom'

import { signOut } from './'

export function Menu (props) {
  return <GrommetMenu>
    <Link to='/' >Home</Link>
    <Link to='/' onClick={props.signOut}>Sign out</Link>
  </GrommetMenu>
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({signOut}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
