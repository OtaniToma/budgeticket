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

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
            <SearchBar />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
