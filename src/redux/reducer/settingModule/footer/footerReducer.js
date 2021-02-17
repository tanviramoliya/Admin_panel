import {
  GET_FOOTER_LIST,
    UPDATE_FOOTER,
  } from "../../../actions/settingModule/footer/footerAction";
  
  const initialState = {
    footerList: []
  };
  
  const footerListReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_FOOTER_LIST : {
        return {
          ...state,
          footerList: action.payload
        };
      }
      case UPDATE_FOOTER: {
        return {
          ...state,
          footerList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default footerListReducer;
  