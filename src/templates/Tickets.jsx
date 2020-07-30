import React, { useState, useEffect, useCallback } from "react";
import Ticket from '../components/organisms/Ticket';
import AirlineLogos from '../reducks/flights/airlineLogos.json'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseTimestamp } from '../firebase/index';
import { addTicketToCart } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Tickets = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  
  const {
    carriers,
    currencies,
    places,
    quotes
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

  const [sort, setSort] = useState('');

  const addTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addTicketToCart({
      added_at: timestamp,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate
    }))
  }

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
              addTicket={addTicket}
            />
          )
        })
      }
    </>
  );
};

export default Tickets;
