import React from 'react';
import SigninTemplate from '../templates/SignIn';
import Grid from '@material-ui/core/Grid';
import BgImage from '../templates/BgImage';

const Signin = () => {
  return (
    <BgImage>
      <Grid container>
        <Grid item xs={1} md={4}>
        </Grid>
        <Grid item xs={10} md={4}>
          <SigninTemplate />
        </Grid>
        <Grid item xs={1} md={4}>
        </Grid>
      </Grid>
    </BgImage>
  );
};

export default Signin;
