import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import TextInput from 'grommet/components/TextInput'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Anchor from '../../components/Anchor'
import Notification from '../../components/Notification'
import Spinning from '../../components/Spinning'

import { bindDom } from '../../utils'

import {
  changeEmail,
  getEmail,
  resetPassword,
  getSubmitted,
  getSuccess,
  getError,
  resetFields
} from '../'

export class ForgotPassword extends React.Component {
  componentDidMount () {
    this.props.resetFields()
  }

  render () {
    const {
      email,
      error,
      submitted,
      success,
      resetPassword,
      changeEmail
    } = this.props

    function handleSubmit (event) {
      event.preventDefault()
      resetPassword()
    }

    const buttonType = submitted ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}}>
      <Form onSubmit={handleSubmit}>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <Box pad='small'>
          <FormFields>
            <FormField label='Email'>
              <TextInput autoFocus value={email} onDOMChange={bindDom(changeEmail)} />
            </FormField>
          </FormFields>
        </Box>
        {error && <Notification status='warning' message={error} />}
        {success && <Notification status='ok' message='Email sent.' />}
        {submitted && <Spinning />}
        <Box pad={{between: 'small', horizontal: 'small'}}>
          <Button fill label='Send request' primary type={buttonType} />
          <Anchor fill label='Login' type='button' href='/login' />
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
    success: getSuccess(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    resetPassword,
    changeEmail,
    resetFields
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)
