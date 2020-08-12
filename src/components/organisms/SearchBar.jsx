import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchFlights } from "../../reducks/flights/operations";
import { Button } from "../atoms";
import { SelectBox, SelectDate, SelectAirport } from "../atoms";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const currencies = [
  {
    value: "CAD",
    label: "CAD",
  },
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "JPY",
    label: "JPY",
  },
];

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

  const [originAirport, setOriginAirport] = useState("YVR");
  const [destinationAirport, setDestinationAirport] = useState("SFO");
  const [currency, setCurrency] = useState("CAD");

  const [departDate, setDepartDate] = useState(aWeekLater);
  const [returnDate, setReturnDate] = useState(twoWeeksLater);

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
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.center}>
          <Box m={1}>
            <SelectAirport
              select={setOriginAirport}
              label={'From'}
            />
          </Box>
          <Box m={1}>
            <SelectAirport
              select={setDestinationAirport}
              label={'To'}
            />
          </Box>
          <Box m={1}>
            <SelectBox
              value={currency}
              options={currencies}
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
        <Box mx="auto" p={1}>
        <Button onClick={() =>
            dispatch(
              searchFlights({
                originAirport,
                destinationAirport,
                currency,
                departDate,
                returnDate
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
  );
};

export default SearchBar;
