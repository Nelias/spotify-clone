import {
  FETCH_SEARCH_DATA,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL,
} from '../actionTypes'

const initialState = {
  searchResponseData: null,
  isSearchLoading: null,
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_DATA: {
      return {
        ...state,
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
