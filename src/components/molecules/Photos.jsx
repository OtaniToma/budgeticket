import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import Unsplash, { toJson } from 'unsplash-js';
import { db } from "../../firebase";

const Photos = () => {
  const selector = useSelector((state) => state);
  const places = getPlaces(selector);

  const [apiKey, setApiKey] = useState('');
  const [photos, setPhotos] = useState([]);

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
      .then(data => {
        setPhotos(data.results)
      });
    }
  }, [places])

  console.log(photos)

  return (
    <>
      {photos && (
        photos.map(photo => {
          return <img src={photo.urls.thumb} />
        })
      )}
    </>
  );
};

export default Photos;
