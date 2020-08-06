import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getPlaces,
  getQuotes
} from "../../reducks/flights/selectors";

const AirportInfo = () => {
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);

  const [airport, setAirport] = useState({
    name: 'San Francisco International Airport',
  }, []);

  useEffect(() => {
    places.map(place => {
      if (quotes.default[0].OutboundLeg.DestinationId === place.PlaceId) {
        setAirport({
          name: place.Name + ' Airport',
          code: place.IataCode,
          country: place.CountryName,
          city: place.CityName,
        })
      }
      return true;
    })
  }, [places, quotes])

  return (
    <>
    <h2>Airport Info</h2>
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
