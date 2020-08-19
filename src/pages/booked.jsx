import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import BookedList from "../templates/Booked";

const Booked = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BookedList />
    </div>
  );
};

export default Booked;
