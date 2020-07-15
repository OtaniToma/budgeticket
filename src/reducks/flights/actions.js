export const TEST_FUNC = "TEST_FUNC";
export const searchFlightsAction = (data) => {
  return {
    type: "TEST_FUNC",
    payload: {
      carriers: data.Carriers,
      currency: data.Currencies,
      places: data.Places,
      quotes: data.Quotes,
    },
  };
};
