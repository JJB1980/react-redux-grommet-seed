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

import Notification from '../../components/Notification'
import Spinning from '../../components/Spinning'

import {
  changeUserName,
  changePassword,
  getError,
  getSubmitted,
  getUserName,
  getPassword,
  getToken,
  submit
} from '../'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const {token, history} = this.props

    if (token) {
      history.push('/')
    }
  }

  componentWillUpdate (newProps) {
    const {token, history} = newProps

    if (token && token !== this.props.token) {
      history.push('/')
    }
  }

  handleChangeUserName (event) {
    this.props.changeUserName(event.target.value)
  }

  handleChangePassword (event) {
    this.props.changePassword(event.target.value)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.submit()
  }

  render () {
    const {username, password, error, submitted, token, history, match} = this.props
    const buttonType = submitted ? null : 'submit'

    return <Box basis='full' align='center' margin={{top: 'large'}} pad='small'>
      <Form onSubmit={this.handleSubmit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Box pad='small'>
          <FormFields>
            <FormField label='Username'>
              <TextInput disabled={submitted} required autoFocus value={username} onDOMChange={this.handleChangeUserName} />
            </FormField>
            <FormField label='Password'>
              <PasswordInput disabled={submitted} required value={password} onChange={this.handleChangePassword} />
            </FormField>
          </FormFields>
        </Box>
        {error && <Notification status='warning' message={error} />}
        {history.location.pathname === '/login/error' && <Notification status='warning' message='Invalid token.' />}
        {submitted && <Spinning />}
        <Box pad='small'>
          <Button fill label='Login' primary type={buttonType} />
        </Box>
        <Box pad='small' align='end'>
          <Link to='hello'>Forgot your password?</Link>
        </Box>
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    username: getUserName(state),
    password: getPassword(state),
    error: getError(state),
    submitted: getSubmitted(state),
    token: getToken(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({changeUserName, changePassword, submit}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm))
