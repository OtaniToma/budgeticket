import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles'
import { Button } from "../components/atoms";

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 500,
    width: '100%' 
  }
})

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  // const ticketsInCart = getTicketsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []);

  return (
    <>
      <h2>Cart</h2>
      <List className={classes.root}>
        {/* {ticketsInCart.length > 0 && (
          ticketsInCart.map(ticket => <CartListItem />)
        )} */}
      </List>
      <Button label={'Proceed to Checkout'} color={"primary"} onClick={goToOrder} />
      <Button label={'Back to Home'} color={"default"}　onClick={backToHome} />
    </>
  )
}

export default CartList