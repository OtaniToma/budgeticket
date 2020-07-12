import React from 'react'
import { getUserId } from '../reducks/users/selectors'
import { getUsername } from '../reducks/users/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../reducks/users/operations'
import { Button } from '../components/ui'

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const username = getUsername(selector)

  return (
    <>
      <h2>Home</h2>
      <p>ID：{uid}</p>
      <p>Username：{username}</p>
      <Button
        label={'Sign Out'}
        color='primary'
        onClick={() => dispatch(signOut())}
      />
    </>
  )
}

export default Home