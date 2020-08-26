import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  getCarriers,
  getCurrencies,
  getPlaces,
  getQuotes,
} from '../reducks/flights/selectors';
import {makeStyles} from '@material-ui/core/styles';
import SearchBar from '../components/organisms/SearchBar';
import Tickets from './Tickets';
import DestinationInfo from '../components/organisms/DestinationInfo';
import Filters from '../components/organisms/Filters';
import {getIsSignedIn} from '../reducks/users/selectors';
import {push} from 'connected-react-router';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '100px auto 0 auto',
    maxWidth: 1024,
    padding: '0 5px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Search = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const carriers = getCarriers(selector);
  const currencies = getCurrencies(selector);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);

  const [sortType, setSortType] = useState('default');
  const quotesToSorted = quotes[sortType];
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    setFilteredQuotes(quotesToSorted);
  }, [quotes, sortType, quotesToSorted]);

  const _filterAirlines = (checked) => {
    const airlineNumbers = [];
    checked.forEach((airline) => {
      airlineNumbers.push(airline.CarrierId);
    });
    const filteredArray = [];
    airlineNumbers.forEach((number) => {
      quotesToSorted.forEach((quote) => {
        if (quote.OutboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote);
          return false;
        }
        if (quote.InboundLeg.CarrierIds[0] === number) {
          filteredArray.push(quote);
        }
      });
    });
    setFilteredQuotes(filteredArray);
  };

  const _filterStops = (checked) => {
    const filteredArray = [];
    const flightNumbers = {
      direct: 0,
      indirect: 0,
    };
    checked.forEach((type) => {
      if (type === 'Non-stop') {
        quotesToSorted.forEach((quote) => {
          if (quote.Direct) {
            filteredArray.push(quote);
            flightNumbers.direct++;
          }
        });
      }
      if (type === 'With Stop(s)') {
        quotesToSorted.forEach((quote) => {
          if (!quote.Direct) {
            filteredArray.push(quote);
            flightNumbers.indirect++;
          }
        });
      }
    });
    setFilteredQuotes(filteredArray);
  };

  const _setSortType = (props) => {
    setSortType(props);
  };

  // Message
  const [open, setOpen] = useState(false);
  const isSignedIn = getIsSignedIn(selector);
  const toSignIn = useCallback(() => dispatch(push('/signin')), [dispatch]);
  const toSignUp = useCallback(() => dispatch(push('/signup')), [dispatch]);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  useEffect(() => {
    if (!isSignedIn) {
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    }
  }, [isSignedIn]);

  const closeError = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
            <SearchBar />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Filters
              setSortType={_setSortType}
              filterStops={_filterStops}
              filterAirlines={_filterAirlines}
            />
          </Grid>
          <Grid item xs={12} sm={9} md={7}>
            <Tickets
              carriers={carriers}
              currencies={currencies}
              places={places}
              quotes={filteredQuotes}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DestinationInfo />
          </Grid>
        </Grid>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="info">
          Please <strong onClick={toSignIn}>sign in</strong>
          or <strong onClick={toSignUp}>create new account to book flights</strong>.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Search;
