
import React from 'react'

export default class AuthComponent extends React.Component {
  componentWillMount () {
    const {token, history, clearForm} = this.props

    if (token) {
      history.push('/')
    } else {
      clearForm()
    }
  }

  componentWillUpdate (newProps) {
    const {token, history} = newProps

    if (token && token !== this.props.token) {
      history.push('/')
    }
  }
}
