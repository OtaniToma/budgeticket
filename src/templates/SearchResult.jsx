import React from "react";

const SearchResult = ({ quotes }) => {

  return (
    <>
      <ul>
        {quotes &&
          quotes.map((quote) => {
            return <li key={quote.QuoteId}>{quote.MinPrice}</li>;
          })}
      </ul>
    </>
  );
};

export default SearchResult;
