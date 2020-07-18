import * as Actions from "./actions";
import initialState from "../initialState";

export const FlightsReducer = (state = initialState.flights, action) => {
  switch (action.type) {
    case Actions.SEARCH_FLIGHTS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ASCEND_FLIGHTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
