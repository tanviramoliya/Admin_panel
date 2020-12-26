export const GET_STATE_LIST = "GET_STATE_LIST";
export const GET_STATE = "GET_STATE";
export const ADD_STATE = "ADD_STATE";
export const DELETE_STATE = "DELETE_STATE";
export const UPDATE_STATE = "UPDATE_STATE";

export const getStateList = (value) => {
  return {
    type: GET_STATE_LIST,
    payload: value,
  };
};
export const addState = (value) => {
  return {
    type: ADD_STATE,
    payload: value,
  };
};
export const deleteState = (value) => {
  return {
    type: DELETE_STATE,
    payload: value,
  };
};

export const updateState = (value) => {
  return {
    type: UPDATE_STATE,
    payload: value,
  };
};

export const getState = (value) => {
  return {
    type: GET_STATE,
    payload: value,
  };
};
