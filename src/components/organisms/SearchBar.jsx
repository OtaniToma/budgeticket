import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchFlights } from "../../reducks/flights/operations";
import { Button } from "../atoms";
import { SelectBox, SelectDate, SelectAirport } from "../atoms";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AirportsData from 'airport-data';
import CurrencyCodes from 'currency-codes';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const getToday = new Date(),
  todayYear = getToday.getFullYear(),
  todayMonth = ("0" + (getToday.getMonth() + 1)).slice(-2),
  todayDay = ("0" + (getToday.getDate())).slice(-2),
  today = todayYear + '-' + todayMonth + '-' + todayDay;
const todayDate = today;

const getAWeekLater = new Date(getToday.getTime() + 7 * 24 * 60 * 60 * 1000),
  aWeekLaterYear = getAWeekLater.getFullYear(),
  aWeekLaterMonth = ("0" + (getAWeekLater.getMonth() + 1)).slice(-2),
  aWeekLaterDay = ("0" + (getAWeekLater.getDate())).slice(-2),
  aWeekLater = aWeekLaterYear + '-' + aWeekLaterMonth + '-' + aWeekLaterDay;

const getTwoWeeksLater = new Date(getToday.getTime() + 14 * 24 * 60 * 60 * 1000),
  twoWeeksLaterYear = getTwoWeeksLater.getFullYear(),
  twoWeeksLaterMonth = ("0" + (getTwoWeeksLater.getMonth() + 1)).slice(-2),
  twoWeeksLaterDay = ("0" + (getTwoWeeksLater.getDate())).slice(-2),
  twoWeeksLater = twoWeeksLaterYear + '-' + twoWeeksLaterMonth + '-' + twoWeeksLaterDay;

const SearchBar = () => {
  const dispatch = useDispatch();

  // Default values
  const yvr = AirportsData.filter(airport => airport.iata === 'YVR')[0],
        sfo = AirportsData.filter(airport => airport.iata === 'SFO')[0];

  const [originAirport, setOriginAirport] = useState("YVR"),
        [destinationAirport, setDestinationAirport] = useState("SFO");

  const [currency, setCurrency] = useState("CAD");

  const [departDate, setDepartDate] = useState(aWeekLater);
  const [returnDate, setReturnDate] = useState(twoWeeksLater);

  // Check dates
  useEffect(() => {
    if (returnDate <= departDate) {
      alert('Please select the departure date before the return date.');
    }
  }, [departDate, returnDate])

  useEffect(() => {
    if (departDate > returnDate) {
      alert('Please select the departure date before the return date.');
    }
  }, [departDate, returnDate])

  // Error Message
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const showError = (props) => {
    setMessage(props);
    setOpen(true);
  }

  const closeError = () => {
    setOpen(false);
  };

  // Styles
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    }
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.center}>
            <Box m={1}>
              <SelectAirport
                select={setOriginAirport}
                label={'From'}
                defaultValue={yvr}
              />
            </Box>
            <Box m={1}>
              <SelectAirport
                select={setDestinationAirport}
                label={'To'}
                defaultValue={sfo}
              />
            </Box>
            <Box m={1}>
              <SelectBox
                value={currency}
                options={CurrencyCodes.data}
                label={'Currency'}
                select={setCurrency}
              />
            </Box>
            <Box m={1}>
              <SelectDate
                label={'Depart'}
                defaultValue={departDate}
                select={setDepartDate}
                minDate={todayDate}
              />
            </Box>
            <Box m={1}>
              <SelectDate
                label={'Return'}
                defaultValue={returnDate}
                select={setReturnDate}
                minDate={todayDate}
              />
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Box mx="auto" p={2}>
              <Button onClick={() =>
                dispatch(
                  searchFlights({
                    originAirport,
                    destinationAirport,
                    currency,
                    departDate,
                    returnDate,
                    showError
                  })
                )
              }
                label={"Search"}
                color={"primary"}
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
