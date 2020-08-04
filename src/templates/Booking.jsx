import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles'
import { getUserId, getBookingTicket } from '../reducks/users/selectors'
import Ticket from '../components/organisms/Ticket';
import Grid from "@material-ui/core/Grid";
import { auth, db, FirebaseTimestamp } from "../firebase/";
import { Button } from "../components/atoms";
import { purchaseTicket } from '../reducks/users/operations'

const usersRef = db.collection("users");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const Booking = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const bookingTicket = getBookingTicket(selector);

  const _purchaseTicket = (ticket) => {
    purchaseTicket(ticket)
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
            {Object.keys(bookingTicket).length > 0 && <Ticket
              id={bookingTicket.id}
              price={bookingTicket.price}
              currencies={bookingTicket.currencies}
              direct={bookingTicket.Direct}
              departAirportCode={bookingTicket.departAirportCode}
              arriveAirportCode={bookingTicket.arriveAirportCode}
              departAirportName={bookingTicket.departAirportName}
              arriveAirportName={bookingTicket.arriveAirportName}
              outboundCarriers={bookingTicket.outboundCarriers}
              inboundCarriers={bookingTicket.inboundCarriers}
              outboundCarriersLogo={bookingTicket.outboundCarriersLogo}
              inboundCarriersLogo={bookingTicket.inboundCarriersLogo}
              outboundDepartureDate={bookingTicket.outboundDepartureDate}
              inboundDepartureDate={bookingTicket.inboundDepartureDate}
            />}
          </Grid>
          <Grid item xs={12} md={3}>
          <Button
            onClick={() => _purchaseTicket(bookingTicket)}
            label={"Purchase"}
            color={"primary"}
          />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Booking