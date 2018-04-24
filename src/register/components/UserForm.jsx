import React from 'react'

import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import FormField from 'grommet/components/FormField'
import FormFields from 'grommet/components/FormFields'
import PasswordInput from 'grommet/components/PasswordInput'
import TextInput from 'grommet/components/TextInput'

import HelpText from '../../components/HelpText'
import Notification from '../../components/Notification'

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
    changePassword,
    errors,
    validateEmail,
    onClickSave,
    onClickUpdatePassword,
    noValidateEmail,
    passwordUpdated,
    passwordUpdateError,
    changeConfirmPassword,
    confirmPassword,
    complete
  } = props

  const buttonType = !complete || errors.size ? null : 'submit'

  return <Box pad={{between: 'small', horizontal: 'small'}} margin={{bottom: 'small'}}>
    <FormFields>
      <FormField label={`First name ${onClickSave ? '' : '*'}`}>
        <TextInput name='firstName' disabled={submitted} required autoFocus value={firstName} onDOMChange={changeFirstName} />
      </FormField>
      <FormField label={`Last name ${onClickSave ? '' : '*'}`}>
        <TextInput name='lasttName' disabled={submitted} required value={lastName} onDOMChange={changeLastName} />
      </FormField>
      <FormField label={`Mobile ${onClickSave ? '' : '*'}`}>
        <TextInput name='mobile' disabled={submitted} required value={mobile} onDOMChange={changeMobile} />
      </FormField>
      {onClickSave && <FormField label='Email' error={errors.get('email')}>
        <TextInput name='email' disabled={submitted} required value={email} onDOMChange={noValidateEmail ? changeEmail : validateEmail} />
      </FormField>}
    </FormFields>
    {onClickSave && <Box>
      <Button primary fill onClick={buttonType ? onClickSave : null} label='Save' type={buttonType} />
      {error && <Notification margin={{top: 'small'}} status='warning' message={error} />}
      {success && <Notification margin={{top: 'small'}} status='ok' message='Profile updated.' />}
    </Box>}
    <FormFields>
      {!onClickSave && <FormField label='Email *' error={errors.get('email')}>
        <TextInput name='email' disabled={submitted} required value={email} onDOMChange={validateEmail} />
      </FormField>}
      {onClickUpdatePassword && <FormField label='Confirm password'>
        <PasswordInput name='password' disabled={submitted} value={confirmPassword} onChange={changeConfirmPassword} />
      </FormField>}
      <FormField label={onClickUpdatePassword ? 'New password' : 'Password *'}>
        <PasswordInput name='password' disabled={submitted} value={password} onChange={changePassword} />
      </FormField>
      {!onClickSave && <HelpText>* denotes a required field</HelpText>}
    </FormFields>
    {onClickUpdatePassword && <Box>
      <Button fill onClick={confirmPassword && password ? onClickUpdatePassword : null} label='Update password' />
      {passwordUpdateError && <Notification margin={{top: 'small'}} status='warning' message={passwordUpdateError} />}
      {passwordUpdated && <Notification margin={{top: 'small'}} status='ok' message='Password updated.' />}
   </Box>}
 </Box>
}

export default LoginForm
