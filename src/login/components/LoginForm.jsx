import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import PasswordInput from 'grommet/components/PasswordInput'
import TextInput from 'grommet/components/TextInput'

import {Helmet} from 'react-helmet'
import {Link } from 'react-router-dom'

import {changeUserName, changePassword, getUserName, getPassword, submit} from '../'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const {username, password} = this.props

    return <Box basis='full' align='center' margin={{top: 'large'}} pad='medium'>
      <Form onSubmit={this.handleSubmit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Box pad='small'>
          <FormFields>
            <FormField label='Username'>
              <TextInput value={username} onDOMChange={this.handleChangeUserName} />
            </FormField>
            <FormField label='Password'>
              <PasswordInput value={password} onChange={this.handleChangePassword} />
            </FormField>
          </FormFields>
        </Box>
        <Box pad='small' align='end'>
          <Link to='hello'>Forgot your password?</Link>
        </Box>
        <Box pad='small'>
          <Button fill label='Login' primary type='submit' />
        </Box>
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    username: getUserName(state),
    password: getPassword(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({changeUserName, changePassword, submit}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
