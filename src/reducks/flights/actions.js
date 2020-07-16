export const SEARCH_FLIGHTS = "SEARCH_FLIGHTS";
export const searchFlightsAction = (data) => {
  return {
    type: "SEARCH_FLIGHTS",
    payload: {
      carriers: data.Carriers,
      currency: data.Currencies,
      places: data.Places,
      quotes: data.Quotes,
    },
  };
};
