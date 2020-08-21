import React, { useState, useEffect, useCallback } from "react";
// import AirportInfo from '../molecules/AirportInfo'
import Photos from '../molecules/Photos'
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import Unsplash, { toJson } from 'unsplash-js';
import { db } from "../../firebase";

const DestinationInfo = () => {
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);

  const [apiKey, setApiKey] = useState('');
  const [place, setPlace] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    db.collection('/keys').doc('unsplash').get().then((doc) => {
      setApiKey(doc.data().key)
    });
  }, [])

  useEffect(() => {
    if (places.length > 0){
      setPlace(places[0].CityName)
    }
  }, [places])

  useEffect(() => {
      const unsplash = new Unsplash({ accessKey: apiKey });
      unsplash.search.photos(place, 1, 10, { orientation: "portrait" })
      .then(toJson)
      .then(data => {
        setImages(data.results)
      });
  }, [place])

  return (
    <>
      {/* <AirportInfo /> */}
      CityName: {place}
      <Photos images={images} />
    </>
  );
};

export default DestinationInfo;
