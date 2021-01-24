export const initialState = {
  contacts: null,
  current: null,
  filtered: null,
  error: null,
  user:null,
  ans:{}
};
export const reducer = (state, action) => {
  if (action.type ==="USER") {
    return {
      ...state,
      user:action.payload
    }
  }
  
  if (action.type ==="SET_CURRENT"){
    return {
      ...state,
      current: action.payload
    };
  }
  if (action.type ==="CLEAR_CURRENT"){
    return {
      ...state,
      current: null
    };
  }
  if (action.type ==="SET_DATA"){
    return {
      ...state,
      ans: action.payload
    };
  }   
 if (action.type === "CLEAR") {
   return {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    user:null,
    ans:{}
   }
 }


  return state;
};
