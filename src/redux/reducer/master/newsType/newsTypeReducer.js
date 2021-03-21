import {
    GET_NEWSTYPE_LIST,
    GET_NEWSTYPE,
    ADD_NEWSTYPE,
    DELETE_NEWSTYPE,
    UPDATE_NEWSTYPE,
    GET_NEWSTYPE_NAME_LIST
  } from "../../../actions/master/newsType/newsTypeAction";
  
  const initialState = {
    newsTypeList: [],
    newsTypeNameList : []
  };
  
  const NewsTypeReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_NEWSTYPE_LIST : {
        return {
          ...state,
          newsTypeList: action.payload
        };
      }
      case GET_NEWSTYPE_NAME_LIST : {
        return {
          ...state,
          newsTypeNameList: action.payload
        };
      }
      case GET_NEWSTYPE : {
        return {
          ...state,
          newsTypeList: [...action.payload]
        };
      }
      case ADD_NEWSTYPE: {
        return {
          ...state,
          newsTypeList: [...action.payload]
        };
      }
      case DELETE_NEWSTYPE: {
        return {
          ...state,
          newsTypeList: [...action.payload]
        };
      }
      case UPDATE_NEWSTYPE: {
        return {
          ...state,
          newsTypeList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default NewsTypeReducer;
  