import {
    GET_CATEGORY_LIST,
    GET_CATEGORY,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    GET_CATEGORY_NAME_LIST
  } from "../../../actions/master/category/categoryAction";
  
  const initialState = {
    categoryList: [],
    categoryNameList : []
  };
  
  const CategoryReducer = function(state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
     
      case GET_CATEGORY_LIST : {
        return {
          ...state,
          categoryList: action.payload
        };
      }
      case GET_CATEGORY_NAME_LIST : {
        return {
          ...state,
          categoryNameList: action.payload
        };
      } 
     
      case GET_CATEGORY : {
        return {
          ...state,
          categoryList: [...action.payload]
        };
      }
      case ADD_CATEGORY: {
        return {
          ...state,
          categoryList: [...action.payload]
        };
      }
      case DELETE_CATEGORY: {
        return {
          ...state,
          categoryList: [...action.payload]
        };
      }
      case UPDATE_CATEGORY: {
        return {
          ...state,
          categoryList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default CategoryReducer;
  