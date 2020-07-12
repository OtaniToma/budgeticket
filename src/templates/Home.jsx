import React from 'react'
import { useSelector } from 'react-redux'
import { getUserId } from '../reducks/users/selectors'

const Home = () => {
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
    </div>
  )
}

export default Home