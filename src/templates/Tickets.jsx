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
              price={quote.MinPrice}
              outboundCarriers={carriersToShow[quote.OutboundLeg.CarrierIds]}
              inboundCarriers={carriersToShow[quote.InboundLeg.CarrierIds]}
            />
          )
        })
      }
    </>
  );
};

export default Tickets;
