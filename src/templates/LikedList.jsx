import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { getTicketsInLiked, getUserId } from '../reducks/users/selectors'
import Ticket from '../components/organisms/Ticket';
import Grid from "@material-ui/core/Grid";
import { db } from "../firebase";
import { confirmTicket } from '../reducks/users/operations';
import { FirebaseTimestamp } from '../firebase/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const LikedList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const ticketsInLiked = getTicketsInLiked(selector);

  const _confirmTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(confirmTicket({
      added_at: timestamp,
      completed: false,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate
    }))
  }

  const _deleteTicket = (props) => {
    const id = props.likedId;
    return db.collection('users').doc(uid)
            .collection('liked').doc(id)
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
            {ticketsInLiked.length > 0 && (
              ticketsInLiked.map(ticket => 
              <Ticket
                key={ticket.likedId}
                id={ticket.id}
                likedId={ticket.likedId}
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
                deleteTicket={_deleteTicket}
                confirmTicket={_confirmTicket}
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

export default LikedList