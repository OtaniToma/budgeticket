import React from 'react';
import ResetTemplate from '../templates/Reset';
import Grid from '@material-ui/core/Grid';
import BgImage from '../templates/BgImage';

const Reset = () => {

  return (
    <BgImage>
      <Grid container>
        <Grid item xs={1} md={4}>
        </Grid>
        <Grid item xs={10} md={4}>
          <ResetTemplate />
        </Grid>
        <Grid item xs={1} md={4}>
        </Grid>
      </Grid>
    </BgImage>
  );
};

export default Reset;
