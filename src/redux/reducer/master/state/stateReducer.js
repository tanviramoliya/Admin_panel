import {
    GET_STATE_LIST,
    GET_STATE,
    ADD_STATE,
    DELETE_STATE,
    UPDATE_STATE,GET_STATE_LIST_BY_COUNTRY
  } from "../../../actions/master/state/stateAction";
  
  const initialState = {
    stateList: []
  };
  
  const StateReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_STATE_LIST : {
        return {
          ...state,
          stateList: action.payload
        };
      }
      case GET_STATE_LIST_BY_COUNTRY : {
        return {
          ...state,
          stateList: action.payload
        };
      }
      case GET_STATE : {
        return {
          ...state,
          stateList: [...action.payload]
        };
      }
      case ADD_STATE: {
        return {
          ...state,
          stateList: [...action.payload]
        };
      }
      case DELETE_STATE: {
        return {
          ...state,
          stateList: [...action.payload]
        };
      }
      case UPDATE_STATE: {
        return {
          ...state,
          stateList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default StateReducer;
  