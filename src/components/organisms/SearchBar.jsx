import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {searchFlights} from '../../reducks/flights/operations';
import {Button} from '../atoms';
import {SelectBox, SelectDate, SelectAirport} from '../atoms';
import {makeStyles} from '@material-ui/core/styles';
import AirportsData from 'airport-data';
import CurrencyCodes from 'currency-codes';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SearchBar = () => {
  const dispatch = useDispatch();

  // Default values
  const yvr = AirportsData.filter((airport) => airport.iata === 'YVR')[0];
  const sfo = AirportsData.filter((airport) => airport.iata === 'SFO')[0];

  const [originAirport, setOriginAirport] = useState('YVR');
  const [destinationAirport, setDestinationAirport] = useState('SFO');

  const [currency, setCurrency] = useState('CAD');

  const aWeekLater = moment().add(1, 'week').format().substring(0, 10);
  const twoWeeksLater = moment().add(2, 'weeks').format().substring(0, 10);

  const [departDate, setDepartDate] = useState(aWeekLater);
  const [returnDate, setReturnDate] = useState(twoWeeksLater);

  // Validation
  useEffect(() => {
    if (returnDate <= departDate) {
      showError('Departure date must be before than the return date.');
    }
  }, [departDate, returnDate]);

  useEffect(() => {
    if (originAirport === destinationAirport) {
      showError('Origin and destination must be different.');
    }
  }, [originAirport, destinationAirport]);

  // Search
  const search = () => {
    if (returnDate <= departDate) {
      showError('Departure date must be before than the return date.');
      return false;
    }
    if (originAirport === destinationAirport) {
      showError('Origin and destination must be different.');
      return false;
    }
    dispatch(
        searchFlights({
          originAirport,
          destinationAirport,
          currency,
          departDate,
          returnDate,
          showError,
        }),
    );
  };

  // Error Message
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const showError = (props) => {
    setMessage(props);
    setOpen(true);
  };

  const closeError = () => {
    setOpen(false);
  };

  // Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      maxWidth: 1024,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} sm={6} md={4}>
            <SelectAirport
              select={setOriginAirport}
              label={'From'}
              defaultValue={yvr}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectAirport
              select={setDestinationAirport}
              label={'To'}
              defaultValue={sfo}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SelectBox
              value={currency}
              options={CurrencyCodes.data}
              label={'Currency'}
              select={setCurrency}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <SelectDate
              select={setDepartDate}
              label={'Depart'}
              defaultValue={aWeekLater}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <SelectDate
              select={setReturnDate}
              label={'Return'}
              defaultValue={twoWeeksLater}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box mx="auto" p={2}>
              <Button onClick={search}
                label={'Search'}
                color={'primary'}
              />
            </Box>
          </Grid>
        </Grid>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SearchBar;
