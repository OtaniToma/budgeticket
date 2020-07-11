import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from './reducks/users/actions';

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.users)

  return (
    <>
      BudgeTicket<br />
      <button onClick={() => dispatch(signInAction({ uid: '0001', username: 'toma'}))}>Sign In</button>
    </>
  );
}

export default App;
