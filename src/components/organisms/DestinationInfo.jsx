import React, { useState, useEffect, useCallback } from "react";
// import AirportInfo from '../molecules/AirportInfo'
import Photos from '../molecules/Photos'
import { useSelector, useDispatch } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import { searchImages } from '../../reducks/images/operations';
import { getImages } from "../../reducks/images/selectors";

const DestinationInfo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);
  const images = getImages(selector);

  useEffect(() => {
    if (places.length > 0){
      const cityName = places[0].CityName;
      dispatch(searchImages(cityName));
    }
  }, [places])

  useEffect(() => {
    if (images.length > 0) {
      console.log(images)
    }
  }, [images])

  return (
    <>
      {/* <AirportInfo /> */}
      {images.length > 0 && <Photos images={images} />}
    </>
  );
};

export default DestinationInfo;
