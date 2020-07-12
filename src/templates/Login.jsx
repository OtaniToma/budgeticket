import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { signInAction } from '../reducks/users/actions'

const Login = () => {
  const dispatch = useDispatch()

  return (
    <>
      <h2>Login</h2>
      <button onClick={() => {
        dispatch(signInAction({ uid: '0001', username: 'toma' }))
        dispatch(push('/'))  
      }}>Login</button>
    </>
  )
}

export default Login