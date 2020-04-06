import {
  SET_CURRENT_TRACK,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAIL,
  FETCH_CATEGORY_PLAYLISTS,
  FETCH_CATEGORY_PLAYLISTS_SUCCESS,
  FETCH_CATEGORY_PLAYLISTS_FAIL,
} from '../actionTypes'

const initialState = {
  currentTrack: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  currentCategoryPlaylists: null,
  currentCategoryName: '',
  currentPlaylist: null,
  isPlaylistLoading: false,
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK: {
      return {
        ...state,
        currentTrack: action.payload.trackURL,
      }
    }

    case FETCH_CATEGORY_PLAYLISTS: {
      return {
        ...state,
        isPlaylistLoading: true,
      }
    }

    case FETCH_CATEGORY_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        currentCategoryPlaylists: action.payload.data,
        currentCategoryName: action.payload.categoryName,
        isPlaylistLoading: false,
      }
    }

    case FETCH_CATEGORY_PLAYLISTS_FAIL: {
      return {
        ...state,
        currentCategoryPlaylists: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        isPlaylistLoading: false,
      }
    }

    case FETCH_PLAYLIST: {
      return {
        ...state,
        isPlaylistLoading: true,
      }
    }

    case FETCH_PLAYLIST_SUCCESS: {
      return {
        ...state,
        currentPlaylist: action.payload.data,
        isPlaylistLoading: false,
      }
    }

    case FETCH_PLAYLIST_FAIL: {
      return {
        ...state,
        currentPlaylist: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        isPlaylistLoading: false,
      }
    }

    default:
      return state
  }
}
