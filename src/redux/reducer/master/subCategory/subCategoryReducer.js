import {
    GET_SUBCATEGORY_LIST,
    GET_SUBCATEGORY,
    ADD_SUBCATEGORY,
    DELETE_SUBCATEGORY,
    UPDATE_SUBCATEGORY,
    GET_SUBCATEGORY_BY_CATEGORY_LIST
  } from "../../../actions/master/subCategory/subCategoryAction";
  
  const initialState = {
    subCategoryList: []
  };
  
  const SubCategoryReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_SUBCATEGORY_LIST : {
        return {
          ...state,
          subCategoryList: action.payload
        };
      }
      case GET_SUBCATEGORY_BY_CATEGORY_LIST : {
        return {
          ...state,
          subCategoryList: action.payload
        };
      }
      case GET_SUBCATEGORY : {
        return {
          ...state,
          subCategoryList: [...action.payload]
        };
      }
      case ADD_SUBCATEGORY: {
        return {
          ...state,
          subCategoryList: [...action.payload]
        };
      }
      case DELETE_SUBCATEGORY: {
        return {
          ...state,
          subCategoryList: [...action.payload]
        };
      }
      case UPDATE_SUBCATEGORY: {
        return {
          ...state,
          subCategoryList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default SubCategoryReducer;
  