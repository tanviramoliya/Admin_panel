export const GET_COUNTRY_LIST = "GET_COUNTRY_LIST";
export const GET_COUNTRY = "GET_COUNTRY";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";

export const getCountryList = (value) => {
  return {
    type: GET_COUNTRY_LIST,
    payload: value,
  };
};
export const addCountry = (value) => {
  return {
    type: ADD_COUNTRY,
    payload: value,
  };
};
export const deleteCountry = (value) => {
  return {
    type: DELETE_COUNTRY,
    payload: value,
  };
};

export const updateCountry = (value) => {
  return {
    type: UPDATE_COUNTRY,
    payload: value,
  };
};

export const getCountry = (value) => {
  return {
    type: GET_COUNTRY,
    payload: value,
  };
};
