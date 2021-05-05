import {
  GET_COMMENTS_LIST,
  GET_COMMENTS,
  DELETE_COMMENTS
  } from "../../actions/comments/index";
  
  const initialState = {
    commentsList: []
  };
  
  const commentsReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_COMMENTS_LIST : {
        return {
          ...state,
          commentsList: action.payload
        };
      }
      case GET_COMMENTS : {
        return {
          ...state,
          commentsList: [...action.payload]
        };
      }
      
      case DELETE_COMMENTS: {
        return {
          ...state,
          commentsList: [...action.payload]
        };
      }
      
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default commentsReducer;
  