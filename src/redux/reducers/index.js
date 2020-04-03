import { combineReducers } from 'redux'
import setSearchPhrase from './search'
import setPlayerState from './player'

export default combineReducers({
  search: setSearchPhrase,
  player: setPlayerState
})
