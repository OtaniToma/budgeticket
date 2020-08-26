import {createSelector} from 'reselect';
const userSelector = (state) => state.flights;

export const getCarriers = createSelector(
    [userSelector],
    (state) => state.carriers,
);

export const getCurrencies = createSelector(
    [userSelector],
    (state) => state.currencies,
);

export const getPlaces = createSelector(
    [userSelector],
    (state) => state.places,
);

export const getQuotes = createSelector(
    [userSelector],
    (state) => ({
      default: state.quotes,
      lowToHigh: [...state.quotes].sort((a, b) => a.MinPrice - b.MinPrice),
      highToLow: [...state.quotes].sort((a, b) => b.MinPrice - a.MinPrice),
      departEarly: [...state.quotes].sort((a, b) =>
        a.OutboundLeg.DepartureDate - b.OutboundLeg.DepartureDate),
    }),
);
