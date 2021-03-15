// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action = {}) => {
 const {type, payload} = action;
 let newState;

 switch (type) {
  case 'LOAD_INITIAL_BOOKS':
   newState =  {
    ...payload
   };
   break;

  case 'ADD_BOOK':
    newState = {
      ...state,
      books:[...state.books, payload]
    }
    break;

  case 'EDIT_BOOK':
    const editedBook = payload;
    const editedSet = state.books.map((eachBook = {}) => {
      if (eachBook.id === editedBook.id)
        return editedBook;
      else
        return eachBook;
    })
    newState = {
      ...state,
      books: editedSet
    }
    break;

  case 'SEARCH_BOOK':
    const searchTerm = payload || '';
    const originalSet = state.books;
    const filteredResults = originalSet.filter(book => book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
    newState = {
      ...state,
      books: filteredResults,
      originalSet
    }
    break;

  case 'CLEAR_SEARCH':
  newState = {
    ...state,
    books: state.originalSet && [...state.originalSet]
  }
  break;

  default:
   newState = state;
   break;
 }

 return newState;
}