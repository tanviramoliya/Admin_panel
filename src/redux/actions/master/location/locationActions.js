export const GET_COUNTRY_LIST = "GET_COUNTRY_LIST";
export const GET_STATE_LIST = "GET_STATE_LIST";
export const GET_CITY_LIST = "GET_CITY_LIST";

export const getCountryList = (value) => {
  return {
    type: GET_COUNTRY_LIST,
    payload: value,
  };
};
export const getStateList = (value) => {
  return {
    type: GET_STATE_LIST,
    payload: value,
  };
};
export const getCityList = (value) => {
  return {
    type: GET_CITY_LIST,
    payload: value,
  };
};

