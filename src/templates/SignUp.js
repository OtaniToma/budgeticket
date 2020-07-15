import React, { useCallback, useState } from 'react'
import { TextInput, Button } from '../components/atoms'
import { signUp } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const SignUp = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState('');
  
  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername]);

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]);

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  }, [setConfirmPassword]);

  return (
    <>
      <h2>Sign Up</h2>
      <TextInput
        fullWidth={true}　label={'Username'}　multiline={false}　required={true}
        rows={1}　value={username}　type={'text'}　onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}　label={'Email'}　multiline={false}　required={true}
        rows={1}　value={email}　type={'email'}　onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}　label={'Password'}　multiline={false}　required={true}
        rows={1}　value={password}　type={'password'}　onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}　label={'Confirm Password'}　multiline={false}　required={true}
        rows={1}　value={confirmPassword}　type={'password'}　onChange={inputConfirmPassword}
      />
        <Button
          label={'Signup'}
          color='primary'
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <p>Already have an account? <span onClick={() => dispatch(push('/signin'))}>Sign in</span></p>
    </>
  )
}

export default SignUp