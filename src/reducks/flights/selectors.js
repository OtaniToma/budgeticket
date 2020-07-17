import { createSelector } from "reselect";
const userSelector = (state) => state.flights;

export const getCarriers = createSelector(
  [userSelector],
  (state) => state.carriers
);

export const getCurrencies = createSelector(
  [userSelector],
  (state) => state.currencies
);

export const getPlaces = createSelector(
  [userSelector],
  (state) => state.places
);

export const getQuotes = createSelector(
  [userSelector],
  (state) => state.quotes
);
