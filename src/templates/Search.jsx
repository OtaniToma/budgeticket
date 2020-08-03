import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarriers,
  getCurrencies,
  getPlaces,
  getQuotes,
  filterQuotes
} from "../reducks/flights/selectors";
import SearchBar from "../components/organisms/SearchBar";
import StopList from "../components/organisms/StopList";
import AirlineList from "../components/organisms/AirlineList";
import AirportInfo from "../components/organisms/AirportInfo";
import Tickets from './Tickets'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Sort from '../components/organisms/Sort';

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
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const carriers = getCarriers(selector);
  const currencies = getCurrencies(selector);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);

  const [sortType, setSortType] = useState('default');
  const quotesToSorted = quotes[sortType];

  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    setQuotesList(quotesToSorted)
  }, [quotes, sortType])

  const filterAirlines = (checked) => {
    const airlineNumbers = [];
    checked.map(airline => {
      airlineNumbers.push(airline.CarrierId)
    })
    const filteredArray = [];
    airlineNumbers.map(number => {
      quotesToSorted.map(quote => {
        if (quote.OutboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote)
          return false
        }
        if (quote.InboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote)
        }
      })
    })
    setQuotesList(filteredArray);
  }

  const filterStops = (checked) => {
    const filteredArray = [];
    const flightNumbers = {
      direct: 0,
      indirect: 0
    };
    checked.map(type => {
      if (type === 'Non-stop') {
        quotesToSorted.map(quote => {
          if (quote.Direct) {
            filteredArray.push(quote)
            flightNumbers.direct++
          }
        })
      }
      if (type === 'With Stop(s)') {
        quotesToSorted.map(quote => {
          if (!quote.Direct) {
            filteredArray.push(quote)
            flightNumbers.indirect++
          }
        })
      }
    })
    setQuotesList(filteredArray);
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} md={2}>
            <Sort onChangeSortType={setSortType} />
            <Divider />
            <StopList
              quotes={quotes.default}
              filterStops={filterStops}
            />
            <Divider />
            <AirlineList
              carriers={carriers}
              onChangeSortType={setSortType}
              filterAirlines={filterAirlines}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Tickets
              carriers={carriers}
              currencies={currencies}
              places={places}
              quotes={quotesList}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <AirportInfo places={places} quotes={quotes['default']} /> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Search;
