import React, { useState, useEffect } from "react";
// import Map from '../atoms/Map'

const AirportInfo = ({ places, quotes }) => {

  const [airport, setAirport] = useState({
    name: 'San Francisco International Airport',
  }, []);

  useEffect(() => {
    places.map(place => {
      if (quotes[0].OutboundLeg.DestinationId === place.PlaceId) {
        setAirport({
          name: place.Name + ' Airport',
          code: place.IataCode,
          country: place.CountryName,
          city: place.CityName,
        })
      }
      return true;
    })
  }, [places])

  return (
    <>
      {/* <Map name={airport.name} /> */}
      <ul>
        <li>{airport.name}</li>
        <li>{airport.code}</li>
        <li>{airport.country}</li>
        <li>{airport.city}</li>
      </ul>
    </>
  );
};

export default AirportInfo;
