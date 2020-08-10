import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios'
import { db } from "../../firebase/";

const Map = ({ data }) => {

  const [apiKey, setApiKey] = useState('');

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    name: '',
    address: '',
    url: ''
  });

  useEffect(() => {
    db.collection('/keys').doc('geocoding').get().then((doc) => {
      setApiKey(doc.data().key)
    })
  }, [])

  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.name}&key=${apiKey}`)
    .then(res => {
      const result = res.data.results[0];
      setLocation({
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        name: result.address_components[0].long_name,
        address: result.formatted_address,
        url: 'https://www.google.com/maps/place/?q=place_id:' + result.place_id,
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, [data])

  const renderMarker = () => {
    if (location.lat !== 0) {
      return (
        <>
          <Marker
            onLoad={marker => {
            }}
            position={{
              lat: location.lat,
              lng: location.lng
            }}
          />
        </>
      );
    }
  }

  return (
    <> 
      {apiKey &&
        <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            width: "100%",
            height: "300px"
          }}
          zoom={12}
          center={{
            lat: location.lat,
            lng: location.lng
          }}>
          {renderMarker()}
        </GoogleMap>
      </LoadScript>
      }
    </>
  )
};

export default Map;
