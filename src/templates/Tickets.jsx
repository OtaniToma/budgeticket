import React, { useState, useEffect } from "react";
import Ticket from '../components/organisms/Ticket'
import Sort from '../components/organisms/Sort';
import AirlineLogos from '../reducks/flights/airlineLogos.json'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Tickets = (props) => {
  
  const {
    carriers,
    currencies,
    places,
    quotes
  } = props;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


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

  const [selectedTicket, setSelectedTicket] = useState({})
  console.log(selectedTicket)

  return (
    <>
      {quotes &&
        quotes.map((quote) => {
          return (
            <Ticket
              id={quote.QuoteId}
              currencies={currencies[0]}
              price={quote.MinPrice.toLocaleString()}
              direct={quote.Direct}
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
              setSelectedTicket={setSelectedTicket}
            />
          )
        })
      }
    </>
  );
};

export default Tickets;
