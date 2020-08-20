import React from "react";
import { makeStyles } from '@material-ui/styles';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardTravelIcon />
      <Typography variant="body1" gutterBottom>
        No tickets found.
      </Typography>
    </div>
  );
};

export default NotFound;
