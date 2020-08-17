import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ConfirmTemplate from "../templates/Confirm";

const Confirm = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ConfirmTemplate />
    </div>
  );
};

export default Confirm;
