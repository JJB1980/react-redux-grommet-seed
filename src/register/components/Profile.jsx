import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import Heading from 'grommet/components/Heading'

import { Helmet } from 'react-helmet'

import AuthComponent from '../../components/AuthComponent'
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
  clearForm,
  isComplete,
  getErrors,
  validateEmail,
  fetchProfile,
  updateProfile,
  getPasswordUpdated,
  getPasswordUpdateError,
  updatePassword,
  getConfirmPassword,
  changeConfirmPassword
} from '../'

export class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchProfile()
  }

  render () {
    const {
      error,
      submitted,
      success,
      submit,
      errors,
      updateProfile,
      updatePassword
    } = this.props

    function handleSubmit (event) {
      event.preventDefault()
      submit()
    }

    return <Box basis='full' align='center'>
      <Form onSubmit={handleSubmit}>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Box margin={{left: 'small', top: 'small'}}>
          <Heading tag='h3'>Profile</Heading>
        </Box>
        <UserForm
          {...this.props}
          noValidateEmail
          onClickUpdatePassword={updatePassword}
          onClickSave={updateProfile}
        />
        {submitted && <Spinning />}
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
    confirmPassword: getConfirmPassword(state),
    error: getError(state),
    submitted: getSubmitted(state),
    success: getSuccess(state),
    token: getToken(state),
    complete: isComplete(state),
    errors: getErrors(state),
    passwordUpdated: getPasswordUpdated(state),
    passwordUpdateError: getPasswordUpdateError(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeFirstName,
    changeLastName,
    changeMobile,
    changeEmail,
    changePassword,
    changeConfirmPassword,
    clearForm,
    validateEmail,
    fetchProfile,
    updateProfile,
    updatePassword
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile))
