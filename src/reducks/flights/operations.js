import { searchFlightsAction } from "./actions";
import { db } from "../../firebase/";

let apiKey = '';
db.collection('/keys').doc('skyscanner').get().then((doc) => {
  apiKey = doc.data().key
})

export const searchFlights = ({
  originAirport,
  destinationAirport,
  currency,
  departDate,
  returnDate
}) => {
  return (dispatch) => {
    fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/${currency}/en-US/${originAirport}/${destinationAirport}/${departDate}/${returnDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "X-RapidAPI-Key": apiKey,
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      dispatch(searchFlightsAction(data));
    })
    .catch((error) => {
      alert("Failed to get the result.");
    });
  };
};