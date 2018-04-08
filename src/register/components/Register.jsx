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
  submit,
  clearForm,
  isComplete,
  getErrors,
  validateEmail
} from '../'

export class LoginForm extends AuthComponent {
  render () {
    const {
      error,
      submitted,
      success,
      submit,
      complete,
      errors
    } = this.props

    function handleSubmit (event) {
      event.preventDefault()
      submit()
    }

    const buttonType = submitted || !complete || errors.size ? null : 'submit'

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
    token: getToken(state),
    complete: isComplete(state),
    errors: getErrors(state)
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
    clearForm,
    validateEmail
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm))
