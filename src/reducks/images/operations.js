import { searchImagesAction } from "./actions";
import { db } from "../../firebase/";
import Unsplash, { toJson } from 'unsplash-js';

let apiKey = '';
db.collection('/keys').doc('unsplash').get().then((doc) => {
  apiKey = doc.data().key;
});

export const searchImages = (props) => {
  return (dispatch) => {
    const unsplash = new Unsplash({ accessKey: apiKey });
    unsplash.search.photos(props, 1, 10, { orientation: "portrait" })
    .then(toJson)
    .then(data => {
      dispatch(searchImagesAction(data.results));
    });
  }
}