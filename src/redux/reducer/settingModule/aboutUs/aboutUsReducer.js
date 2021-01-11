import {
    GET_ABOUTUS_LIST,
    UPDATE_ABOUTUS,
  } from "../../../actions/settingModule/aboutUs/AboutUsAction";
  
  const initialState = {
    aboutUsList: []
  };
  
  const aboutUsListReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_ABOUTUS_LIST : {
        return {
          ...state,
          aboutUsList: action.payload
        };
      }
      case UPDATE_ABOUTUS: {
        return {
          ...state,
          aboutUsList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default aboutUsListReducer;
  