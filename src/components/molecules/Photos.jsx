import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import Unsplash, { toJson } from 'unsplash-js';
import { db } from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: 'auto',
    },
  }));
  const classes = useStyles();

  return (
    <>
      {photos && (
        <div className={classes.root}>
        <GridList cellHeight={150} className={classes.gridList} cols={2}>
          {photos.map((photo) => (
            <GridListTile key={photo.id} cols={1}>
              <img src={photo.urls.thumb} alt={photo.description} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      )}
    </>
  );
};

export default Photos;
