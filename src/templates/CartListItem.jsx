import React from 'react'
import { useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase/index'

const CartListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  const removeTicketFromCart = (id) => {
    return db.collection('users').doc(uid)
              .collection('cart').doc(id)
              .delete()
  }

  return (
    <>
      <ListItem>
        {quote.price}
        <IconButton onClick={() => removeTicketFromCart(props.ticket.cartId)} >
          <DeleteIcon/>
        </IconButton>
      </ListItem>
    </>
  )
}

export default CartListItem