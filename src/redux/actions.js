import {
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_FAIL,
  FETCH_SEARCH_DATA,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_NEW_RELEASES,
  FETCH_NEW_RELEASES_SUCCESS,
  FETCH_NEW_RELEASES_FAIL,
  FETCH_CATEGORY_PLAYLISTS,
  FETCH_CATEGORY_PLAYLISTS_SUCCESS,
  FETCH_CATEGORY_PLAYLISTS_FAIL,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAIL,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  SET_CURRENT_TRACK,
  FETCH_ARTIST_ALBUMS,
  FETCH_ARTIST_ALBUMS_SUCCESS,
  FETCH_ARTIST_ALBUMS_FAIL,
} from './actionTypes'
import axios from 'axios'

export const fetchSearchData = (dispatch, phrase) => {
  dispatch({ type: FETCH_SEARCH_DATA, payload: phrase })

  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=${phrase}&type=artist%2Calbum%2Ctrack&limit=30`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
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

export const fetchCategories = (dispatch, categoryName) => {
  dispatch({ type: FETCH_CATEGORIES, payload: null })

  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/browse/categories',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: { data: data, currentCategoryName: categoryName },
      })
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
    url: 'https://api.spotify.com/v1/browse/new-releases',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
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

export const fetchCategoryPlaylists = (
  dispatch,
  categoryPlaylistsURL,
  categoryName
) => {
  dispatch({ type: FETCH_CATEGORY_PLAYLISTS, payload: null })

  axios({
    method: 'GET',
    url: `${categoryPlaylistsURL}/playlists`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({
        type: FETCH_CATEGORY_PLAYLISTS_SUCCESS,
        payload: { data: data, categoryName: categoryName },
      })
    )
    .catch((err) => {
      console.error(err)
      dispatch({
        type: FETCH_CATEGORY_PLAYLISTS_FAIL,
        payload: err,
        error: true,
      })
    })
}

export const fetchPlaylist = (dispatch, playlistURL) => {
  dispatch({ type: FETCH_PLAYLIST, payload: null })

  axios({
    method: 'GET',
    url: `${playlistURL}`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_PLAYLIST_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_PLAYLIST_FAIL, payload: err, error: true })
    })
}

export const fetchUserProfile = (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE, payload: null })

  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_USER_PROFILE_FAIL, payload: err, error: true })
    })
}

export const fetchArtistAlbums = (dispatch, artistID) => {
  dispatch({ type: FETCH_ARTIST_ALBUMS, payload: null })

  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/artists/${artistID}/albums`,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_OAUTH_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .then((data) =>
      dispatch({ type: FETCH_ARTIST_ALBUMS_SUCCESS, payload: { data } })
    )
    .catch((err) => {
      console.error(err)
      dispatch({ type: FETCH_ARTIST_ALBUMS_FAIL, payload: err, error: true })
    })
}

export const setCurrentTrackURL = (trackURL) => ({
  type: SET_CURRENT_TRACK,
  payload: { trackURL },
})
