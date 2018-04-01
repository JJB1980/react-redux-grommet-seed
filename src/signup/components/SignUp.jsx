import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import RegisterForm from './RegisterForm'
import Anchor from '../../components/Anchor'
import Notification from '../../components/Notification'
import Spinning from '../../components/Spinning'

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
  submit
} from '../'

export function LoginForm (props) {

  function handleSubmit (event) {
    event.preventDefault()
    this.props.submit()
  }

  const {
    error,
    submitted,
    success,
  } = props

  const buttonType = submitted ? null : 'submit'

  return <Box basis='full' align='center' margin={{top: 'large'}}>
    <Form onSubmit={handleSubmit}>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <RegisterForm {...props} />
      {error && <Notification status='warning' message={error} />}
      {success && <Notification status='ok' message='User created.' />}
      {submitted && <Spinning />}
      <Box pad='small'>
        <Button fill label='Sign up' primary type={buttonType} />
      </Box>
      <Box pad='small'>
        <Anchor fill label='Login' type='button' href='/login' />
      </Box>
    </Form>
  </Box>
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
    success: getSuccess(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeFirstName,
    changeLastName,
    changeMobile,
    changeEmail,
    changePassword,
    submit
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
