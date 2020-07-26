import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Map from '../atoms/Map'

const AirportInfo = ({ places, quotes }) => {

  const [airport, setAirport] = useState({
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
    })

  }, [places])

  return (
    <>
      <Map name={airport.name} />
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
