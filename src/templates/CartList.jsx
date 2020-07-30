import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles'
import { getTicketsInCart } from '../reducks/users/selectors'

const useStyles = makeStyles({
})

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []);

  return (
    <>
      <h2>CarList</h2>
    </>
  )
}

export default CartList