import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarriers,
  getCurrencies,
  getPlaces,
  getQuotes,
} from "../reducks/flights/selectors";
import SearchBar from "../components/organisms/SearchBar";
import StopList from "../components/organisms/StopList";
import AirlineList from "../components/organisms/AirlineList";
import SearchResult from "./SearchResult";
import Tickets from './Tickets'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { List } from "@material-ui/core";

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
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const carriers = getCarriers(selector);
  const currencies = getCurrencies(selector);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);
  const classes = useStyles();
  const [sortType, setSortType] = useState('default');
  const list = quotes[sortType];

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
            <AirlineList carriers={carriers} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Tickets
              carriers={carriers}
              currencies={currencies}
              places={places}
              quotes={list}
              onChangeSortType={setSortType}
            />
          </Grid>
          <Grid item xs={12} md={2}>
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
