import { searchFlightsAction } from "./actions";
import { db } from "../../firebase/";
import { push } from "connected-react-router";

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
      if (data.Quotes.length === 0) {
        alert('Could not find tickets. Please try with different airport or date.');
        return false;
      }
      dispatch(push('/search'));
      dispatch(searchFlightsAction(data));
    })
    .catch((error) => {
      alert("Failed to get the result.");
    });
  };
};