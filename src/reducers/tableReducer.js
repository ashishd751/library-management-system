// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
 let newState;
 switch (action.type) {
  case 'LOAD_INITIAL_BOOKS':
   newState =  {
    ...action.payload
   };
   break;

  case 'ADD_BOOK':
  newState = {
    ...state,
    books:[...state.books, action.payload]
   }
  break;

  default:
   newState = state;
   break;
 }

 return newState;
}