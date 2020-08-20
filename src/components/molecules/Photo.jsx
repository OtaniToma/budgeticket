import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import Unsplash, { toJson } from 'unsplash-js';
import { db } from "../../firebase/";

const Photo = () => {
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);

  const [apiKey, setApiKey] = useState('');
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    db.collection('/keys').doc('unsplash').get().then((doc) => {
      setApiKey(doc.data().key)
    });
  }, [])

  useEffect(() => {
    if (places.length > 0) {
      const city = places[0].CityName;
      const unsplash = new Unsplash({ accessKey: apiKey });
      unsplash.search.photos(city, 1, 10, { orientation: "portrait" })
      .then(toJson)
      .then(json => {
        console.log(json)
      });
    }
  }, [places])


  return (
    <>

    </>
  );
};

export default Photo;
