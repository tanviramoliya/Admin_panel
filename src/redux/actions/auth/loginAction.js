import { SET_LOGIN_USER, SET_LOGIN_FLAG } from "../types/types";

export const setLoginUser = (value) => {
  return {
    type: SET_LOGIN_USER,
    payload: { data: value },
  };
};

export const setLoginFlag = (value) => {
  return {
    type: SET_LOGIN_FLAG,
    payload: { data: value },
  };
};

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
