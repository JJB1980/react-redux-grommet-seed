import React from 'react'

import Box from 'grommet/components/Box'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import PasswordInput from 'grommet/components/PasswordInput'
import TextInput from 'grommet/components/TextInput'

import { bindDom } from '../../utils'

export function LoginForm (props) {
  const {
    firstName,
    lastName,
    mobile,
    email,
    password,
    error,
    submitted,
    success,
    token,
    changeFirstName,
    changeLastName,
    changeMobile,
    changeEmail,
    changePassword
  } = props

  return <Box pad={{between: 'small', horizontal: 'small'}} margin={{bottom: 'small'}}>
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
    </FormFields>
    <FormFields>
      <FormField label='Email'>
        <TextInput name='email' disabled={submitted} required value={email} onDOMChange={bindDom(changeEmail)} />
      </FormField>
      <FormField label='Password'>
        <PasswordInput name='password' disabled={submitted} required value={password} onChange={bindDom(changePassword)} />
      </FormField>
    </FormFields>
  </Box>
}

export default LoginForm
