import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsername } from '../reducks/users/selectors'

import { searchFlights } from '../reducks/flights/operations'

import { Button } from '../components/UI'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const username = getUsername(selector)
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h2>検索バー</h2>
              <h2>フィルタ</h2>
              <Button onClick={() => dispatch(searchFlights())} label={'検索'} />
              {username}
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper className={classes.paper}>
              <h2>直行・経由</h2>
              <h2>航空会社</h2>
              <h2>検索履歴</h2>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <h2>検索結果</h2>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper className={classes.paper}>
              <h2>現地情報</h2>
              <h2>現地空港</h2>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home