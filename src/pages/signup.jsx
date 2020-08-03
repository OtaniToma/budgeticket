import React from "react";
import SignupTemplate from "../templates/SignUp";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const Signup = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        </Grid>
        <Grid item xs={12} md={4}>
          <SignupTemplate />
        </Grid>
        <Grid item xs={12} md={4}>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
