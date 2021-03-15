export const loadInitialBooks = (data) => dispatch => {
 dispatch({
  type: 'LOAD_INITIAL_BOOKS',
  payload: data
 })
}

export const addBook = (data) => dispatch => {
 dispatch({
  type: 'ADD_BOOK',
  payload: data
 })
}

export const editBook = (data) => dispatch => {
 dispatch({
  type: 'EDIT_BOOK',
  payload: data
 })
}

export const searchBook = (data) => dispatch => {
 dispatch({
  type: 'SEARCH_BOOK',
  payload: data
 })
}

export const clearSearchResults = (data) => dispatch => {
 dispatch({
  type: 'CLEAR_SEARCH',
  payload: data
 })
}