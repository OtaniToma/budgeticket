import React from "react";
import Ticket from '../components/organisms/Ticket'

const Tickets = (props) => {
  const {
    quotes
  } = props;

  return (
    <>
      {quotes &&
        quotes.map((quote) => {
          return (
            <Ticket id={quote.QuoteId} price={quote.MinPrice} />
          )
        })
      }
    </>
  );
};

export default Tickets;
