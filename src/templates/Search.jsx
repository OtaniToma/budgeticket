import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarriers,
  getCurrency,
  getPlaces,
  getQuotes,
} from "../reducks/flights/selectors";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const carriers = getCarriers(selector);
  const currency = getCurrency(selector);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>検索バー</h2>
            <SearchBar />
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper className={classes.paper}>
              <h2>直行・経由</h2>
              <Divider />
              <h2>航空会社</h2>
              <ul>
                {carriers &&
                  carriers.map((carrier) => {
                    return <li key={carrier.CarrierId}>{carrier.Name}</li>;
                  })}
              </ul>
              <Divider />
              <h2>検索履歴</h2>
              <Divider />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <h2>検索結果</h2>
              <ul>
                {quotes &&
                  quotes.map((quote) => {
                    return <li key={quote.QuoteId}>{quote.MinPrice}</li>;
                  })}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper className={classes.paper}>
              <h2>現地情報</h2>
              <Divider />
              <h2>現地空港</h2>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Search;
