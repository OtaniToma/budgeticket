import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'sans-serif',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main>
        <Router />
      </main>
    </div>
  );
};

export default App;
