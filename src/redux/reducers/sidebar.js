import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_NEW_RELEASES,
  FETCH_NEW_RELEASES_SUCCESS,
  FETCH_NEW_RELEASES_FAIL,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
} from '../actionTypes'

const initialState = {
  categories: null,
  newReleases: null,
  userProfile: null,
  areCategoriesLoading: null,
  areNewReleasesLoading: null,
  isUserProfileLoading: null,
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      return {
        ...state,
        areCategoriesLoading: true,
      }
    }

    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload.data,
        areCategoriesLoading: false,
      }
    }

    case FETCH_CATEGORIES_FAIL: {
      return {
        ...state,
        categories: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        areCategoriesLoading: false,
      }
    }

    case FETCH_NEW_RELEASES: {
      return {
        ...state,
        areNewReleasesLoading: true,
      }
    }

    case FETCH_NEW_RELEASES_SUCCESS: {
      return {
        ...state,
        newReleases: action.payload.data,
        areNewReleasesLoading: false,
      }
    }

    case FETCH_NEW_RELEASES_FAIL: {
      return {
        ...state,
        newReleases: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        areNewReleasesLoading: false,
      }
    }

    case FETCH_USER_PROFILE: {
      return {
        ...state,
        isUserProfileLoading: true,
      }
    }

    case FETCH_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: action.payload.data,
        isUserProfileLoading: false,
      }
    }

    case FETCH_USER_PROFILE_FAIL: {
      return {
        ...state,
        userProfile: action.payload.response.data
          ? action.payload.response.data.error
          : {
              status: action.payload.response.status,
              message: 'Could not find resource',
            },
        isUserProfileLoading: false,
      }
    }

    default:
      return state
  }
}
