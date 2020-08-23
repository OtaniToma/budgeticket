import React, { useState, useEffect, useCallback } from "react";
// import AirportInfo from '../molecules/AirportInfo'
import Photos from '../molecules/Photos'
import { useSelector, useDispatch } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import { searchImages } from '../../reducks/images/operations';

const DestinationInfo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);

  useEffect(() => {
    if (places.length > 0){
      const cityName = places[0].CityName;
      console.log(cityName);
      dispatch(searchImages(cityName));
    }
  }, [places])

  return (
    <>
      {/* <AirportInfo /> */}
      <Photos />
    </>
  );
};

export default DestinationInfo;
