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

import { bindDom, bindSubmit } from '~/src/utils'
import Anchor from '~/src/components/Anchor'
import AuthComponent from '~/src/components/AuthComponent'
import Notification from '~/src/components/Notification'
import Spinning from '~/src/components/Spinning'

import {
  changeEmail,
  changePassword,
  getError,
  getSubmitted,
  getEmail,
  getPassword,
  getToken,
  submit,
  isComplete,
  clearForm
} from '../'

export class LoginForm extends AuthComponent {
  render () {
    const {
      username,
      password,
      error,
      submitted,
      token,
      history,
      match,
      changeEmail,
      changePassword,
      isComplete,
      submit
    } = this.props
    const buttonType = submitted || !isComplete ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}}>
      <Form onSubmit={submit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Box pad='small'>
          <Heading tag='h3'>Log in</Heading>
          <FormFields>
            <FormField label='Email'>
              <TextInput name='email' disabled={submitted} required autoFocus value={username} onDOMChange={changeEmail} />
            </FormField>
            <FormField label='Password'>
              <PasswordInput name='password' disabled={submitted} required value={password} onChange={changePassword} />
            </FormField>
          </FormFields>
        </Box>
        {error && <Notification status='warning' message={error} />}
        {history.location.pathname === '/login/error' && <Notification status='warning' message='Invalid token.' />}
        {submitted && <Spinning />}
        <Box pad={{between: 'small', horizontal: 'small'}}>
          <Button fill label='Login' primary type={buttonType} />
          <Anchor fill label='Register' type='button' href='/register' />
          <Link to='/requestResetPassword'>Forgot your password?</Link>
        </Box>
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    username: getEmail(state),
    password: getPassword(state),
    error: getError(state),
    submitted: getSubmitted(state),
    token: getToken(state),
    isComplete: isComplete(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeEmail: bindDom(changeEmail),
    changePassword: bindDom(changePassword),
    submit: bindSubmit(submit),
    clearForm
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm))
