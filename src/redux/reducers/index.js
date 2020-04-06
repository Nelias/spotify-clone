import { combineReducers } from 'redux'
import searchReducer from './search'
import playerReducer from './player'
import sidebarReducer from './sidebar'

export default combineReducers({
  search: searchReducer,
  player: playerReducer,
  sidebar: sidebarReducer,
})
