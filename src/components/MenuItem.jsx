import React from 'react'
import classnames from 'classnames'

import { Link, withRouter } from 'react-router-dom'

import './MenuItem.scss'

export function MenuItem (props) {
  const {location: {pathname}, children} = props

  return <div className={classnames({'menu-item': true, 'menu-item--active': pathname === props.to})}>
    <Link to={props.to} onClick={props.onClick}>{children}</Link>
  </div>
}

export default withRouter(MenuItem)