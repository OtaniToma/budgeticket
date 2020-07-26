import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = (props) => {

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    name: '',
    address: '',
    url: ''
  });

  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.name}&key=AIzaSyAwFm8nidy09UCt7c16zYl8imUooco5OyU`)
    .then(res => {
      const data = res.data.results[0];
      setLocation({
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng,
        name: data.address_components[0].long_name,
        address: data.formatted_address,
        url: 'https://www.google.com/maps/place/?q=place_id:' + data.place_id,
      });
    })
    .catch((error) => {
      alert(error);
    })
  }, [location])

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
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAwFm8nidy09UCt7c16zYl8imUooco5OyU"
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
    </>
  );
};

export default Map;