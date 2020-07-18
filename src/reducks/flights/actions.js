export const SEARCH_FLIGHTS = "SEARCH_FLIGHTS";

export const searchFlightsAction = (data) => {
  return {
    type: "SEARCH_FLIGHTS",
    payload: {
      carriers: data.Carriers,
      currencies: data.Currencies,
      places: data.Places,
      quotes: data.Quotes,
    },
  };
};

export const ASCEND_FLIGHTS = "ASCEND_FLIGHTS";
export const ascendFlightsAction = (data) => {
  return {
    type: "ASCEND_FLIGHTS",
    payload: {
      quotes: data
    }
  };
};