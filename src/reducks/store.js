import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducer } from "./users/reducers";
import { FlightsReducer } from "./flights/reducers";
import { ImagesReducer } from "./images/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      flights: FlightsReducer,
      images: ImagesReducer
    }),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
}
