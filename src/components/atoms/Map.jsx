import React from "react";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = (props) => {

  // const [location, setLocation] = useState({
  //   lat: 0,
  //   lng: 0,
  //   name: '',
  //   address: '',
  //   url: ''
  // });

  // const [apiKey, setApiKey] = useState('')

  // db.collection('/keys').doc('geocoding').get().then((doc) => {
  //   setApiKey(doc.data().key)
  // })

  // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.name}&key=${apiKey}`)
  //   .then(res => {
  //     const data = res.data.results[0];
  //     setLocation({
  //       lat: data.geometry.location.lat,
  //       lng: data.geometry.location.lng,
  //       name: data.address_components[0].long_name,
  //       address: data.formatted_address,
  //       url: 'https://www.google.com/maps/place/?q=place_id:' + data.place_id,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  // })

  // const renderMarker = () => {
  //   if (location.lat !== 0) {
  //     return (
  //       <>
  //         <Marker
  //           onLoad={marker => {
  //           }}
  //           position={{
  //             lat: location.lat,
  //             lng: location.lng
  //           }}
  //         />
  //       </>
  //     );
  //   }
  // }
  
  return (
    <>
      {/* <LoadScript
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
      </LoadScript> */}
    </>
  );
};

export default Map;
