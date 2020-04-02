import {
  SET_SEARCH_PHRASE,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL,
  FETCH_SEARCH_DATA
} from './actionTypes'
import axios from 'axios'

export const setSearchPhrase = (phrase) => ({
  type: SET_SEARCH_PHRASE,
  payload: { phrase }
})

export const fetchSearchData = (dispatch, phrase) => {
  dispatch({ type: FETCH_SEARCH_DATA, payload: phrase })
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=${phrase}&type=artist&market=US&limit=10`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`
    }
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_SEARCH_DATA_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_SEARCH_DATA_FAIL, payload: err, error: true })
    })
}
