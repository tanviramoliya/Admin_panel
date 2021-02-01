import {
  GET_INQUIRY_LIST,
  GET_INQUIRY,
  ADD_INQUIRY,
  DELETE_INQUIRY
  } from "../../actions/inquiry/index";
  
  const initialState = {
    inquiryList: []
  };
  
  const InquiryReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_INQUIRY_LIST : {
        return {
          ...state,
          inquiryList: action.payload
        };
      }
      case GET_INQUIRY : {
        return {
          ...state,
          inquiryList: [...action.payload]
        };
      }
      case ADD_INQUIRY: {
        return {
          ...state,
          inquiryList: [...action.payload]
        };
      }
      case DELETE_INQUIRY: {
        return {
          ...state,
          inquiryList: [...action.payload]
        };
      }
      
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default InquiryReducer;
  