import {
  SET_SEARCH_PHRASE,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL,
} from '../actionTypes'

const initialState = {
  searchPhrase: 'start',
  searchResponseData: null,
  isSearchLoading: null,
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PHRASE: {
      return {
        ...state,
        searchPhrase: action.payload.phrase,
        isSearchLoading: true,
      }
    }

    case FETCH_SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        searchResponseData: action.payload.data,
        isSearchLoading: false,
      }
    }

    case FETCH_SEARCH_DATA_FAIL: {
      return {
        ...state,
        searchResponseData: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        isSearchLoading: false,
      }
    }

    default:
      return state
  }
}
