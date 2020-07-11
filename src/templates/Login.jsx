import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

const Login = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  console.log(selector.router)

  return (
    <>
      <h2>Login</h2>
      <button onClick={() => dispatch(push('/'))}>Login</button>
    </>
  )
}

export default Login