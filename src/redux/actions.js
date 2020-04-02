import {
  SET_SEARCH_PHRASE,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL,
  FETCH_SEARCH_DATA,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_NEW_RELEASES,
  FETCH_NEW_RELEASES_SUCCESS,
  FETCH_NEW_RELEASES_FAIL
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
    url: `https://api.spotify.com/v1/search?q=${phrase}&type=artist%2Calbum%2Ctrack&limit=30`,
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

export const fetchCategories = (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES, payload: null })

  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/browse/categories`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`
    }
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_CATEGORIES_FAIL, payload: err, error: true })
    })
}

export const fetchNewReleases = (dispatch) => {
  dispatch({ type: FETCH_NEW_RELEASES, payload: null })

  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/browse/new-releases`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`
    }
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_NEW_RELEASES_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_NEW_RELEASES_FAIL, payload: err, error: true })
    })
}
