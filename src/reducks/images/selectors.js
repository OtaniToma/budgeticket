import { createSelector } from "reselect";
const userSelector = (state) => state.images;

export const getImages = createSelector(
  [userSelector],
  (state) => state.data
);