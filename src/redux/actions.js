import { SET_SEARCH_PHRASE, FETCH_SEARCH_DATA } from './actionTypes'

export const setSearchPhrase = (phrase) => ({
  type: SET_SEARCH_PHRASE,
  payload: { phrase }
})

export const fetchSearchData = () => ({
  type: FETCH_SEARCH_DATA
})
