import { createSelector } from "reselect";
const userSelector = (state) => state.flights;

export const getCarriers = createSelector(
  [userSelector],
  (state) => state.carriers
);

export const getCurrency = createSelector(
  [userSelector],
  (state) => state.currency
);

export const getPlaces = createSelector(
  [userSelector],
  (state) => state.places
);

export const getQuotes = createSelector(
  [userSelector],
  (state) => state.quotes
);
