import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { auth, db, FirebaseTimestamp } from "../firebase/";

const Test = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Test</h1>
    </div>
  );
};

export default Test;
