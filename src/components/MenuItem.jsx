import React from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import './MenuItem.scss'

export class MenuItem extends React.Component {
  render () {
    const {location: {pathname}, children, to, onClick} = this.props

    return <div className={classnames({'menu-item': true, 'menu-item--active': pathname === to})}>
      <Link to={to} onClick={onClick}>{children}</Link>
    </div>
  }
}

export default MenuItem