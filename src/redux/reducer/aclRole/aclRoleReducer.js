import {
  GET_ACL_ROLE_LIST,
  GET_ACL_ROLE,
  ADD_ACL_ROLE,
  DELETE_ACL_ROLE,
  UPDATE_ACL_ROLE,
  GET_ACL_ROLE_NAME_LIST
  } from "../../actions/aclRole/index";
  
  const initialState = {
    aclRoleList: [],
    aclRoleNameList : []
  };
  
  const AclRoleReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_ACL_ROLE_LIST : {
        return {
          ...state,
          aclRoleList: action.payload
        };
      }
      
      case GET_ACL_ROLE_NAME_LIST : {
        return {
          ...state,
          aclRoleNameList: action.payload
        };
      }
      case GET_ACL_ROLE : {
        return {
          ...state,
          aclRoleList: [...action.payload]
        };
      }
      case ADD_ACL_ROLE: {
        return {
          ...state,
          aclRoleList: [...action.payload]
        };
      }
      case DELETE_ACL_ROLE: {
        return {
          ...state,
          aclRoleList: [...action.payload]
        };
      }
      case UPDATE_ACL_ROLE: {
        return {
          ...state,
          aclRoleList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default AclRoleReducer;
  