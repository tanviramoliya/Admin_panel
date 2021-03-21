import {
   GET_ADMIN_INFO
    } from "../../actions/profile/profileAction";
    
    const initialState = {
      info: {}
    };
    
    const profileReducer = function(state = initialState, action) {
      switch (action.type) {
        case GET_ADMIN_INFO : {
          return {
            ...state,
            info: action.payload
          };
        }
        default: {
          return {
            ...state
          };
        }
      }
    };
    
    export default profileReducer;
    