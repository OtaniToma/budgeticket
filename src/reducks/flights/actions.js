export const SEARCH_FLIGHTS = 'SEARCH_FLIGHTS';
export const searchFlightsAction = (data) => {
  return {
    type: SEARCH_FLIGHTS,
    payload: {
      carriers: data.Carriers,
      currencies: data.Currencies,
      places: data.Places,
      quotes: data.Quotes,
    },
  };
};
