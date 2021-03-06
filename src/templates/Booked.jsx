import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {getTicketsInBooked, getUserId} from '../reducks/users/selectors';
import Ticket from '../components/organisms/Ticket';
import Grid from '@material-ui/core/Grid';
import {db} from '../firebase';
import {fetchTicketsInBooked} from '../reducks/users/operations';
import NotFound from '../components/organisms/NotFound';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '100px auto 0 auto',
    maxWidth: 1024,
    padding: '0 5px',
  },
}));

const BookedList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const ticketsInBooked = getTicketsInBooked(selector);

  useEffect(() => {
    let ticketsInBooked = getTicketsInBooked(selector);
    const unsubscribe = db.collection('users').doc(uid).collection('booked')
        .onSnapshot((snapshots) => {
          snapshots.docChanges().forEach((change) => {
            const ticket = change.doc.data();
            const changeType = change.type;

            switch (changeType) {
              case 'added':
                ticketsInBooked.push(ticket);
                break;
              case 'removed':
                ticketsInBooked = ticketsInBooked.filter((ticket) =>
                  ticket.bookedId !== change.doc.id);
                break;
              default:
                break;
            }
          });
          dispatch(fetchTicketsInBooked(ticketsInBooked));
        });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={7}>
            <h2>Booked Tickets</h2>
            {ticketsInBooked.length > 0 && (
              ticketsInBooked.map((ticket) =>
                <>
                  <Ticket
                    key={ticket.bookedId}
                    id={ticket.id}
                    bookedId={ticket.bookedId}
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
                  />
                  <Typography variant="body1" gutterBottom><PersonIcon /> {ticket.passenger}</Typography>
                </>,
              )
            )}
            {ticketsInBooked.length === 0 && <NotFound />}
          </Grid>
          <Grid item xs={12} md={3}>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BookedList;
