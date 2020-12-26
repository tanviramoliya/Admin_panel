export const GET_CITY_LIST = "GET_CITY_LIST";
export const GET_CITY = "GET_CITY";
export const ADD_CITY = "ADD_CITY";
export const DELETE_CITY = "DELETE_CITY";
export const UPDATE_CITY = "UPDATE_CITY";

export const getCityList = (value) => {
  return {
    type: GET_CITY_LIST,
    payload: value,
  };
};
export const addCity = (value) => {
  return {
    type: ADD_CITY,
    payload: value,
  };
};
export const deleteCity = (value) => {
  return {
    type: DELETE_CITY,
    payload: value,
  };
};

export const updateCity = (value) => {
  return {
    type: UPDATE_CITY,
    payload: value,
  };
};

export const getCity = (value) => {
  return {
    type: GET_CITY,
    payload: value,
  };
};
