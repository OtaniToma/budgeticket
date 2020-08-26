import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {getConfirmTicket} from '../reducks/users/selectors';
import Ticket from '../components/organisms/Ticket';
import Grid from '@material-ui/core/Grid';
import {Button} from '../components/atoms';
import {bookTicket} from '../reducks/users/operations';
import {TextInput} from '../components/atoms';
import {getUsername} from '../reducks/users/selectors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {push} from 'connected-react-router';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '100px auto 0 auto',
    maxWidth: 1024,
    padding: '0 5px',
  },
}));

const Confirm = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const confirmTicket = getConfirmTicket(selector);
  const dispatch = useDispatch();
  const username = getUsername(selector);

  // eslint-disable-next-line
  const [ticket, setTicket] = useState(confirmTicket);
  const [passenger, setPassenger] = useState(username);

  useEffect(() => {
    ticket.passenger = passenger;
    // eslint-disable-next-line
  }, [passenger]);

  const changePassengerName = (props) => {
    setPassenger(props);
  };

  const _bookTicket = (ticket) => {
    dispatch(bookTicket(ticket));
    showAlert('Ticket has been booked.');
    setTimeout(() => {
      dispatch(push('/user/booked'));
    }, 2000);
  };

  // Alert
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);

  const showAlert = (props) => {
    setAlert(props);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={7}>
            <h2>Ticket Confirmation</h2>
            {Object.keys(confirmTicket).length > 0 && <Ticket
              id={confirmTicket.id}
              price={confirmTicket.price}
              currencies={confirmTicket.currencies}
              direct={confirmTicket.Direct}
              departAirportCode={confirmTicket.departAirportCode}
              arriveAirportCode={confirmTicket.arriveAirportCode}
              departAirportName={confirmTicket.departAirportName}
              arriveAirportName={confirmTicket.arriveAirportName}
              outboundCarriers={confirmTicket.outboundCarriers}
              inboundCarriers={confirmTicket.inboundCarriers}
              outboundCarriersLogo={confirmTicket.outboundCarriersLogo}
              inboundCarriersLogo={confirmTicket.inboundCarriersLogo}
              outboundDepartureDate={confirmTicket.outboundDepartureDate}
              inboundDepartureDate={confirmTicket.inboundDepartureDate}
            />}
            <TextInput
              label={'Passenger Name'}
              defaultValue={username}
              required={true}
              onChange={changePassengerName}
            />
            <Box p={2} />
            <Button
              onClick={() => _bookTicket(ticket)}
              label={'Book'}
              color={'primary'}
            />
          </Grid>
          <Grid item xs={12} md={3}>
          </Grid>
        </Grid>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success">
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Confirm;
