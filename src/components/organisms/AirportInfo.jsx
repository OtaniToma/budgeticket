import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
    {airport.name}
    {airport.code}
    {airport.country}
    {airport.city}
    </>
  );
};

export default AirportInfo;
