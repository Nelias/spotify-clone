import { SET_CURRENT_TRACK } from '../actionTypes'

const initialState = {
  currentTrack: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
}

export default function setPlayerState(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK: {
      return {
        ...state,
        currentTrack: action.payload.trackURL
      }
    }

    default:
      return state
  }
}
