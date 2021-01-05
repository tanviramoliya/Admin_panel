import {
  GET_NEWS_LIST,
  GET_NEWS,
  ADD_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS,
  } from "../../actions/newsUpdate/index";
  
  const initialState = {
    newsList: []
  };
  
  const NewsUpdateReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_NEWS_LIST : {
        return {
          ...state,
          newsList: action.payload
        };
      }
      case GET_NEWS : {
        return {
          ...state,
          newsList: [...action.payload]
        };
      }
      case ADD_NEWS: {
        return {
          ...state,
          newsList: [...action.payload]
        };
      }
      case DELETE_NEWS: {
        return {
          ...state,
          newsList: [...action.payload]
        };
      }
      case UPDATE_NEWS: {
        return {
          ...state,
          newsList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default NewsUpdateReducer;
  