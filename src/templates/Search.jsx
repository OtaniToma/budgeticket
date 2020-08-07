import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getCarriers,
  getCurrencies,
  getPlaces,
  getQuotes
} from "../reducks/flights/selectors";
import SearchBar from "../components/organisms/SearchBar";
import Tickets from './Tickets'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DestinationInfo from '../components/organisms/DestinationInfo'
import Filters from '../components/organisms/Filters'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Search = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);

  const carriers = getCarriers(selector);
  const currencies = getCurrencies(selector);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);

  const [sortType, setSortType] = useState('default');
  const quotesToSorted = quotes[sortType];
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    setFilteredQuotes(quotesToSorted)
  }, [quotes, sortType, quotesToSorted])

  const _filterAirlines = (checked) => {
    const airlineNumbers = [];
    checked.forEach(airline => {
      airlineNumbers.push(airline.CarrierId)
    })
    const filteredArray = [];
    airlineNumbers.forEach(number => {
      quotesToSorted.forEach(quote => {
        if (quote.OutboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote)
          return false
        }
        if (quote.InboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote)
        }
      })
    })
    setFilteredQuotes(filteredArray);
  }

  const _filterStops = (checked) => {
    const filteredArray = [];
    const flightNumbers = {
      direct: 0,
      indirect: 0
    };
    checked.forEach(type => {
      if (type === 'Non-stop') {
        quotesToSorted.forEach(quote => {
          if (quote.Direct) {
            filteredArray.push(quote)
            flightNumbers.direct++
          }
        })
      }
      if (type === 'With Stop(s)') {
        quotesToSorted.forEach(quote => {
          if (!quote.Direct) {
            filteredArray.push(quote)
            flightNumbers.indirect++
          }
        })
      }
    })
    setFilteredQuotes(filteredArray);
  }

  const _setSortType = (props) => {
    setSortType(props)
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} md={2}>
            <Filters
              setSortType={_setSortType}
              filterStops={_filterStops}
              filterAirlines={_filterAirlines}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Tickets
              carriers={carriers}
              currencies={currencies}
              places={places}
              quotes={filteredQuotes}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DestinationInfo />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Search;
