import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles'
import { getTicketsInCart, getUserId } from '../reducks/users/selectors'
import Ticket from '../components/organisms/Ticket';
import Grid from "@material-ui/core/Grid";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const ticketsInCart = getTicketsInCart(selector);

  const purchaseTicket = (props) => {
    console.log(props)
  }

  const deleteTicket = (props) => {
    const id = props.cartId;
    return db.collection('users').doc(uid)
            .collection('cart').doc(id)
            .delete()
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={7}>
            {ticketsInCart.length > 0 && (
              ticketsInCart.map(ticket => 
              <Ticket
                key={ticket.cartId}
                id={ticket.id}
                cartId={ticket.cartId}
                currencies={ticket.currencies}
                price={ticket.price}
                direct={ticket.direct}
                departAirportCode={ticket.departAirportCode}
                arriveAirportCode={ticket.arriveAirportCode}
                departAirportName={ticket.departAirportName}
                arriveAirportName={ticket.arriveAirportName}
                outboundCarriers={ticket.outboundCarriers}
                inboundCarriers={ticket.inboundCarriers}
                outboundCarriersLogo={ticket.outboundCarriersLogo}
                inboundCarriersLogo={ticket.inboundCarriersLogo}
                outboundDepartureDate={ticket.outboundDepartureDate}
                inboundDepartureDate={ticket.inboundDepartureDate}
                addTicket={false}
                deleteTicket={deleteTicket}
                purchaseTicket={purchaseTicket}
              />)
            )}
          </Grid>
          <Grid item xs={12} md={3}>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default CartList