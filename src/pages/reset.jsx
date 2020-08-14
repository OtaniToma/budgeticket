import React from "react";
import ResetTemplate from "../templates/Reset";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const Reset = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={1} md={4}>
        </Grid>
        <Grid item xs={10} md={4}>
          <ResetTemplate />
        </Grid>
        <Grid item xs={1} md={4}>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reset;
