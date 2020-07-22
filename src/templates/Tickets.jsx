import React, { useState, useEffect } from "react";
import Ticket from '../components/organisms/Ticket'
import AirlineLogos from '../reducks/flights/airlineLogos.json'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Tickets = (props) => {
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const {
    carriers,
    currencies,
    places,
    quotes,
    onChangeSortType
  } = props;

  const carriersToShow = {};
  carriers.map(carrier => {
    carriersToShow[carrier.CarrierId] = carrier.Name
  });

  const logosToShow = {};
  carriers.map(carrier => {
    AirlineLogos.map(airline => {
      if (carrier.Name === airline.name) {
        logosToShow[carrier.Name] = airline.logo
      }
    })
  });

  const classes = useStyles();
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    switch (sort) {
      case 'lowToHigh':
        onChangeSortType('lowToHigh')
        break;
      case 'highToLow':
        onChangeSortType('highToLow')
        break;
      case 'departEarly':
        onChangeSortType('departEarly')
        break;
    }
  }, [sort])

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={'lowToHigh'}>Low to High</MenuItem>
          <MenuItem value={'highToLow'}>High to Low</MenuItem>
          <MenuItem value={'departEarly'}>Early Departure</MenuItem>
        </Select>
      </FormControl>

      {quotes &&
        quotes.map((quote) => {
          return (
            <Ticket
              id={quote.QuoteId}
              currencies={currencies[0]}
              price={quote.MinPrice.toLocaleString()}
              departAirportCode={places[1].IataCode}
              arriveAirportCode={places[0].IataCode}
              departAirportName={places[1].Name}
              arriveAirportName={places[0].Name}
              outboundCarriers={carriersToShow[quote.OutboundLeg.CarrierIds]}
              inboundCarriers={carriersToShow[quote.InboundLeg.CarrierIds]}
              outboundCarriersLogo={logosToShow[carriersToShow[quote.OutboundLeg.CarrierIds]]}
              inboundCarriersLogo={logosToShow[carriersToShow[quote.InboundLeg.CarrierIds]]}
              outboundDepartureDate={quote.OutboundLeg.DepartureDate.substring(0, 10).substring(5, 10)}
              inboundDepartureDate={quote.InboundLeg.DepartureDate.substring(0, 10).substring(5, 10)}
            />
          )
        })
      }
    </>
  );
};

export default Tickets;
