import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Map from '../atoms/Map'

const AirportInfo = ({ places }) => {

  const [airport, setAirport] = useState({});

  useEffect(() => {
    if (places.length > 0) {
      const data = places[0];
      setAirport({
        name: data.Name + ' Airport',
        code: data.IataCode,
        country: data.CountryName,
        city: data.CityName,
      })
    }
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
