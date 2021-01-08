import {
    GET_SOCIALMEDIA_LIST,
    UPDATE_SOCIALMEDIA,
  } from "../../../actions/settingModule/socialMedia/socialMediaAction";
  
  const initialState = {
    socialMediaList: []
  };
  
  const socialMediaReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_SOCIALMEDIA_LIST : {
        return {
          ...state,
          socialMediaList: action.payload
        };
      }
      case UPDATE_SOCIALMEDIA: {
        return {
          ...state,
          socialMediaList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default socialMediaReducer;
  