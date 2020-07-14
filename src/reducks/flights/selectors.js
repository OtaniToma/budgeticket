import { createSelector } from 'reselect'
const userSelector = (state) => state.flights;

export const getCurrencies = createSelector(
  [userSelector],
  state => state.Currencies
)