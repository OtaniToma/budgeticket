import React from 'react';
import SignupTemplate from '../templates/SignUp';
import Grid from '@material-ui/core/Grid';
import BgImage from '../templates/BgImage';

const Signup = () => {
  return (
    <BgImage>
      <Grid container spacing={2}>
        <Grid item xs={1} md={4}>
        </Grid>
        <Grid item xs={10} md={4}>
          <SignupTemplate />
        </Grid>
        <Grid item xs={1} md={4}>
        </Grid>
      </Grid>
    </BgImage>
  );
};

export default Signup;
