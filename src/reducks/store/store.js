import {
  createStore as reduxCreateStore,
  combineReducers,
} from 'redux'

import { UsersReducer } from '../users/reducers'

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer
    })
  )
}