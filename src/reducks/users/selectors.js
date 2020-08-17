import { createSelector } from "reselect";

const userSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector(
  [userSelector],
  (state) => state.username
);

export const getTicketsInLiked = createSelector(
  [userSelector],
  (state) => state.liked
);

export const getConfirmTicket = createSelector(
  [userSelector],
  (state) => state.booking
);
