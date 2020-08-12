import React from "react";
import SearchBar from "../components/organisms/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url('https://images.unsplash.com/uploads/14114640960629b5c3fa0/116dc05a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80')`,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    margin: theme.spacing(16),
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Box mx="auto" p={16}>
          <Card>
            <CardContent>
            <h1>Where to next?</h1>
            <SearchBar />
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default Home;
