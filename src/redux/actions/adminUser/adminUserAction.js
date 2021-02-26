export const GET_ADMIN_USER_LIST = "GET_ADMIN_USER_LIST";
export const GET_ADMIN_USER = "GET_ADMIN_USER";
export const ADD_ADMIN_USER = "ADD_ADMIN_USER";
export const DELETE_ADMIN_USER = "DELETE_ADMIN_USER";
export const UPDATE_ADMIN_USER = "UPDATE_ADMIN_USER";
export const GET_ADMIN_NAME_LIST = "GET_ADMIN_NAME_LIST";

export const getAdminUserList = (value) => {
  return {
    type: GET_ADMIN_USER_LIST,
    payload: value,
  };
};
export const addAdminUser= (value) => {
  return {
    type: ADD_ADMIN_USER,
    payload: value,
  };
};
// export const deleteCountry = (value) => {
//   return {
//     type: DELETE_COUNTRY,
//     payload: value,
//   };
// };

export const updateAdminUser = (value) => {
  return {
    type: UPDATE_ADMIN_USER,
    payload: value,
  };
};

export const getAdminUser = (value) => {
  return {
    type: GET_ADMIN_USER,
    payload: value,
  };
};

export const getAdminNameList = (value) => {
  return {
    type: GET_ADMIN_NAME_LIST,
    payload: value,
  };
};