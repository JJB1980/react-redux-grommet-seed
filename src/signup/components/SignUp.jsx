import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import PasswordInput from 'grommet/components/PasswordInput'
import TextInput from 'grommet/components/TextInput'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import { bindDom } from '../../utils'
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
  submit
} from '../'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.submit()
  }

  render () {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password,
      error,
      submitted,
      token,
      history,
      match,
      changeFirstName,
      changeLastName,
      changeMobile,
      changeEmail,
      changePassword
    } = this.props
    const buttonType = submitted ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}} pad='small'>
      <Form onSubmit={this.handleSubmit}>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Box pad='small'>
          <FormFields>
            <FormField label='First Name'>
              <TextInput name='firstName' disabled={submitted} required autoFocus value={firstName} onDOMChange={bindDom(changeFirstName)} />
            </FormField>
            <FormField label='Last Name'>
              <TextInput name='lasttName' disabled={submitted} required value={lastName} onDOMChange={bindDom(changeLastName)} />
            </FormField>
            <FormField label='Mobile'>
              <TextInput name='mobile' disabled={submitted} required value={mobile} onDOMChange={bindDom(changeMobile)} />
            </FormField>
            <FormField label='Email'>
              <TextInput name='email' disabled={submitted} required value={email} onDOMChange={bindDom(changeEmail)} />
            </FormField>
            <FormField label='Password'>
              <PasswordInput name='password' disabled={submitted} required value={password} onChange={bindDom(changePassword)} />
            </FormField>
          </FormFields>
        </Box>
        {error && <Notification status='warning' message={error} />}
        {submitted && <Spinning />}
        <Box pad='small'>
          <Button fill label='Signup' primary type={buttonType} />
        </Box>
        <Box pad='small'>
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
    submitted: getSubmitted(state)
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm))
