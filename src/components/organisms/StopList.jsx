import React, { useState, useEffect } from "react";

const StopList = ({ quotes, filterStops }) => {
  const [directFlights, setDirectFlights] = useState(0);
  const [indirectFlights, setIndirectFlights] = useState(0);

  useEffect(() => {
    let direct = 0,
        indirect = 0;
    quotes.map(quote => {
      quote.Direct ? direct++ : indirect++
    })
    setDirectFlights(direct);
    setIndirectFlights(indirect);
  }, [quotes])

  const _filterStops = () => {
    filterStops('direct')
  }

  return (
    <>
    <ul>
      <li>Non-Stop:   {directFlights}</li>
      <li>With Stop: {indirectFlights}</li>
    </ul>
    <button onClick={_filterStops}>filter</button>
    </>
  );
};

export default StopList;
