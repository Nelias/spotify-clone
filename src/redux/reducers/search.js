import { SET_SEARCH_PHRASE, FETCH_SEARCH_DATA } from '../actionTypes'
import axios from 'axios'

const initialState = {
  searchPhrase: 'start',
  responseData: []
}

export default function searchPhraseResult(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PHRASE: {
      return {
        ...state,
        searchPhrase: action.payload.phrase
      }
    }
    case FETCH_SEARCH_DATA: {
      let response

      async function fetchData() {
        response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/search?q=${state.searchPhrase}&type=artist&market=US&limit=10`,
          responseType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
          }
        })
      }

      fetchData()

      return {
        ...state,
        responseData: response
      }
    }

    default:
      return state
  }
}
