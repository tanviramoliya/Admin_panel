export const GET_ACL_ROLE_LIST = "GET_ACL_ROLE_LIST";
export const GET_ACL_ROLE = "GET_ACL_ROLE";
export const ADD_ACL_ROLE = "ADD_ACL_ROLE";
export const DELETE_ACL_ROLE = "DELETE_ACL_ROLE";
export const UPDATE_ACL_ROLE = "UPDATE_ACL_ROLE";

export const getAclRoleList = (value) => {
  return {
    type: GET_ACL_ROLE_LIST,
    payload: value,
  };
};
export const addAclRole= (value) => {
  return {
    type: ADD_ACL_ROLE,
    payload: value,
  };
};
// export const deleteCountry = (value) => {
//   return {
//     type: DELETE_COUNTRY,
//     payload: value,
//   };
// };

export const updateAclRole = (value) => {
  return {
    type: UPDATE_ACL_ROLE,
    payload: value,
  };
};

export const getAclRole = (value) => {
  return {
    type: GET_ACL_ROLE,
    payload: value,
  };
};
