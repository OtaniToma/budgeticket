import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import BookingTemplate from "../templates/Booking";

const Booking = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BookingTemplate />
    </div>
  );
};

export default Booking;
