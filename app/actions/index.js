import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchUser(login))
}

export const PARTNER_REQUEST = 'PARTNER_REQUEST'
export const PARTNER_SUCCESS = 'PARTNER_SUCCESS'
export const PARTNER_FAILURE = 'PARTNER_FAILURE'

// Fetches a single partner from API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchPartners = fullName => ({
  [CALL_API]: {
    types: [ PARTNER_REQUEST, PARTNER_SUCCESS, PARTNER_FAILURE ],
    endpoint: `partners/${fullName}`,
    schema: Schemas.PARTNER
  }
})

// Fetches a single partner from API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadPartner = (fullName, requiredFields = []) => (dispatch, getState) => {
  const partner = getState().entities.partners[fullName]
  if (partner && requiredFields.every(key => partner.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchPartners(fullName))
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'

// Fetches a page of starred partners by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [ STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.PARTNER_ARRAY
  }
})

// Fetches a page of starred partners by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStarred(login, nextPageUrl))
}

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'

// Fetches a page of stargazers for a particular partner.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [ STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

// Fetches a page of stargazers for a particular partner.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `partners/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByPartner[fullName] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl))
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
