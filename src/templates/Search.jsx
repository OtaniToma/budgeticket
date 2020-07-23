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
import Tickets from './Tickets'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
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

  useEffect(()=>{
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
    console.log(filteredArray);
    setQuotesList(filteredArray);
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>検索バー</h2>
            <SearchBar />
          </Grid>
          <Grid item xs={12} md={2}>
            <StopList
              quotes={quotes.default}
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
              onChangeSortType={setSortType}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <h2>現地情報</h2>
            <Divider />
            <h2>現地空港</h2>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Search;
