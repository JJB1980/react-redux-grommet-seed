import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import Heading from 'grommet/components/Heading'
import PasswordInput from 'grommet/components/PasswordInput'
import TextInput from 'grommet/components/TextInput'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Anchor from '~/src/components/Anchor'
import AuthComponent from '~/src/components/AuthComponent'
import Notification from '~/src/components/Notification'
import Spinning from '~/src/components/Spinning'

import { bindDom } from '~/src/utils'

import {
  changeEmail,
  getEmail,
  submit,
  getSubmitted,
  getSuccess,
  getError,
  clearForm,
  isComplete,
  getErrors,
  validateToken,
  changePassword,
  getPassword,
  resetPassword,
  getPasswordResetSuccess,
  getValidateError
} from '../'
import {getToken} from '~/src/login'

export class ForgotPassword extends AuthComponent {
  componentDidMount () {
    const {token} = this.props.match.params

    if (token) {
      this.props.validateToken(token)
    }
  }

  render () {
    const {
      email,
      error,
      submitted,
      success,
      submit,
      changeEmail,
      complete,
      errors,
      match,
      password,
      changePassword,
      resetPassword,
      passwordResetSuccess,
      validateError
    } = this.props

    const {token} = match.params

    function handleSubmit (event) {
      event.preventDefault()

      if (token) {
        resetPassword()
      } else {
        submit()
      }
    }

    const buttonType = submitted || !complete || errors.size ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}}>
      <Form onSubmit={handleSubmit}>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <Box pad='small'>
          <Heading tag='h3'>Forgot password</Heading>
          {!validateError && <FormFields>
            <FormField label='Email' error={errors.get('email')}>
              <TextInput autoFocus disabled={token} id='email' name='email' value={email} onDOMChange={changeEmail} />
            </FormField>
            {token && <FormField label='New Password'>
              <PasswordInput name='password' disabled={submitted} required value={password} onChange={changePassword} />
            </FormField>}
          </FormFields>}
        </Box>
        {validateError && <Notification status='warning' message={validateError} />}
        {error && <Notification status='warning' message={error} />}
        {passwordResetSuccess && <Notification status='ok' message='Password reset.' />}
        {success && <Notification status='ok' message='Email sent.' />}
        {submitted && <Spinning />}
        <Box pad={{between: 'small', horizontal: 'small'}}>
          <Button fill label='Send request' primary type={buttonType} />
          <Anchor label='Login' type='anchor' href='/login' />
        </Box>
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    email: getEmail(state),
    error: getError(state),
    submitted: getSubmitted(state),
    success: getSuccess(state),
    token: getToken(state),
    complete: isComplete(state),
    errors: getErrors(state),
    password: getPassword(state),
    passwordResetSuccess: getPasswordResetSuccess(state),
    validateError: getValidateError(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    submit,
    changeEmail: bindDom(changeEmail),
    clearForm,
    changePassword: bindDom(changePassword),
    validateToken,
    resetPassword
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword))
