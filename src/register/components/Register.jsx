import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import Heading from 'grommet/components/Heading'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import UserForm from './UserForm'
import Anchor from '../../components/Anchor'
import Notification from '../../components/Notification'
import Spinning from '../../components/Spinning'

import {getToken} from '../../login'
import {
  changeFirstName,
  changeLastName,
  changeMobile,
  changeEmail,
  changePassword,
  getFirstName,
  getLastName,
  getMobile,
  getError,
  getSubmitted,
  getEmail,
  getPassword,
  getSuccess,
  submit,
  clearForm
} from '../'

export class LoginForm extends React.Component {
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

  render () {
    const {
      error,
      submitted,
      success,
      submit
    } = this.props

    function handleSubmit (event) {
      event.preventDefault()
      submit()
    }

    const buttonType = submitted ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}}>
      <Form onSubmit={handleSubmit}>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Box margin={{left: 'small', top: 'small'}}>
          <Heading tag='h3'>Register</Heading>
        </Box>
        <UserForm {...this.props} />
        {error && <Notification status='warning' message={error} />}
        {success && <Notification status='ok' message='User created.' />}
        {submitted && <Spinning />}
        <Box pad={{between: 'small', horizontal: 'small'}}>
          <Button fill label='Register' primary type={buttonType} />
          <Anchor fill label='Login' type='button' href='/login' />
        </Box>
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    firstName: getFirstName(state),
    lastName: getLastName(state),
    mobile: getMobile(state),
    email: getEmail(state),
    password: getPassword(state),
    error: getError(state),
    submitted: getSubmitted(state),
    success: getSuccess(state),
    token: getToken(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeFirstName,
    changeLastName,
    changeMobile,
    changeEmail,
    changePassword,
    submit,
    clearForm
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm))
