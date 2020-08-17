import * as Actions from "./actions";
import initialState from "../initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.CONFIRM_TICKET:
      return {
        ...state,
        confirm: action.payload
      }
      case Actions.BOOK_TICKET:
        return {
          ...state,
          booked: [...action.payload]
      }
    case Actions.FETCH_TICKETS_IN_LIKED:
      return {
        ...state,
        liked: [...action.payload]
      }
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload
      }
    default:
      return state
  }
};
