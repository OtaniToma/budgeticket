import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getPlaces,
  getQuotes
} from "../../reducks/flights/selectors";
import Map from '../atoms/Map';
import Typography from '@material-ui/core/Typography';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Box from '@material-ui/core/Box';

const AirportInfo = () => {
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);
  const quotes = getQuotes(selector);

  const [airport, setAirport] = useState({
    name: '',
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
      {airport.name && <Map data={airport} />}
      <Box p={1} bgcolor="background.paper" />
      {airport.name &&
      <>
        <Typography variant="subtitle2" gutterBottom>
          {airport.name} ({airport.code})
        </Typography>
        <Typography variant="body1" gutterBottom>
          {airport.city}, {airport.country}
        </Typography>
      </>
    }
    </>
  );
};

export default AirportInfo;
