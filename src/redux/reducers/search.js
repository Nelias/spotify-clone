import {
  SET_SEARCH_PHRASE,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL
} from '../actionTypes'

const initialState = {
  searchPhrase: 'start',
  searchResponseData: null
}

export default function searchPhraseResult(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PHRASE: {
      return {
        ...state,
        searchPhrase: action.payload.phrase
      }
    }

    case FETCH_SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        searchResponseData: action.payload.data
      }
    }

    case FETCH_SEARCH_DATA_FAIL: {
      return {
        ...state,
        searchResponseData: action.payload.err
      }
    }

    default:
      return state
  }
}
