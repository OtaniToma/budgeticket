import React from "react";
import Ticket from '../components/organisms/Ticket'

const Tickets = (props) => {
  const {
    carriers,
    currencies,
    places,
    quotes,
  } = props;

  console.log(props);

  const carriersToShow = {};
  carriers.map(carrier => {
    carriersToShow[carrier.CarrierId] = carrier.Name
  });

  return (
    <>
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
