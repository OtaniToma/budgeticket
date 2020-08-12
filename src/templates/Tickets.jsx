import React from "react";
import Ticket from '../components/organisms/Ticket';
import AirlineLogos from '../constants/airlineLogos.json'
import { useDispatch } from 'react-redux';
import { FirebaseTimestamp } from '../firebase/index';
import { addTicketToLiked, bookTicket } from '../reducks/users/operations';

const Tickets = (props) => {
  const dispatch = useDispatch();
  
  const {
    carriers,
    currencies,
    places,
    quotes
  } = props;

  const carriersToShow = {};
  carriers.forEach(carrier => {
    carriersToShow[carrier.CarrierId] = carrier.Name
  });

  const logosToShow = {};
  carriers.forEach(carrier => {
    AirlineLogos.forEach(airline => {
      if (carrier.Name === airline.name) {
        logosToShow[carrier.Name] = airline.logo
      }
    })
  });

  const _likeTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addTicketToLiked({
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

  const _bookTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(bookTicket({
      added_at: timestamp,
      completed: false,
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
              key={quote.QuoteId}
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
              likeTicket={_likeTicket}
              bookTicket={_bookTicket}
            />
          )
        })
      }
    </>
  );
};

export default Tickets;
