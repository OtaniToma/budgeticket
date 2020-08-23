import * as Actions from "./actions";
import initialState from "../initialState";

export const ImagesReducer = (state = initialState.images, action) => {
  switch (action.type) {
    case Actions.SEARCH_IMAGES:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
