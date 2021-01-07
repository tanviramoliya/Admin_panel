import {
  GET_ADMIN_USER_LIST,
  GET_ADMIN_USER,
  ADD_ADMIN_USER,
  DELETE_ADMIN_USER,
  UPDATE_ADMIN_USER,
  } from "../../actions/adminUser/index";
  
  const initialState = {
    adminUserList: []
  };
  
  const AdminUserReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_ADMIN_USER_LIST : {
        return {
          ...state,
          adminUserList: action.payload
        };
      }
      case GET_ADMIN_USER : {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case ADD_ADMIN_USER: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case DELETE_ADMIN_USER: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case UPDATE_ADMIN_USER: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default AdminUserReducer;
  