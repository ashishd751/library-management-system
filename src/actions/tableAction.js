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