export const GET_ABOUTUS_LIST = "GET_ABOUTUS_LIST";
export const UPDATE_ABOUTUS = "UPDATE_ABOUTUS";

export const getAboutUsList = (value) => {
  return {
    type: GET_ABOUTUS_LIST,
    payload: value,
  };
};

export const updateAboutUs = (value) => {
  return {
    type: UPDATE_ABOUTUS,
    payload: value,
  };
};

