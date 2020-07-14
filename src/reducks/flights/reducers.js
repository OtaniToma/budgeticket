import * as Actions from './actions'
import initialState from '../store/initialState'

export const FlightsReducer = (state = initialState.flights, action) => {
  switch (action.type) {
    case Actions.TEST_FUNC:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}