import React from "react";
import SearchBar from "../components/organisms/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Image from '../assets/bgimage.jpg';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${Image})`,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    margin: theme.spacing(16),
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
      <Box mx="auto" p={1}>
      <Paper elevation={3} className={classes.paper}>
        <SearchBar />
      </Paper>
      </Box>
      </div>
    </>
  );
};

export default Home;
