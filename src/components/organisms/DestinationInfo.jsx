import React, {useEffect} from 'react';
import AirportInfo from '../molecules/AirportInfo';
import Photos from '../molecules/Photos';
import {useSelector, useDispatch} from 'react-redux';
import {getPlaces} from '../../reducks/flights/selectors';
import {searchImages} from '../../reducks/images/operations';
import {getImages} from '../../reducks/images/selectors';

const DestinationInfo = () => {
  const dispatch = useDispatch();
  const places = useSelector(getPlaces);
  const images = useSelector(getImages);

  useEffect(() => {
    if (places.length > 0) {
      const cityName = places[0].CityName;
      dispatch(searchImages(cityName));
    }
  }, [places, dispatch]);

  const showImages = () => {
    if (images.length > 0) {
      return (<Photos images={images} />);
    }
  };

  return (
    <>
      <AirportInfo />
      {showImages()}
    </>
  );
};

export default DestinationInfo;
