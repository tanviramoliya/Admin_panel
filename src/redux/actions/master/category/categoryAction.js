export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
export const GET_CATEGORY_NAME_LIST = "GET_CATEGORY_NAME_LIST";
export const GET_CATEGORY = "GET_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const getCategoryList = (value) => {
  return {
    type: GET_CATEGORY_LIST,
    payload: value,
  };
};
export const getCategoryNameList = (value) => {
  return {
    type: GET_CATEGORY_NAME_LIST,
    payload: value,
  };
};
export const addCategory = (value) => {
  return {
    type: ADD_CATEGORY,
    payload: value,
  };
};
export const deleteCategory = (value) => {
  return {
    type: DELETE_CATEGORY,
    payload: value,
  };
};

export const updateCategory = (value) => {
  return {
    type: UPDATE_CATEGORY,
    payload: value,
  };
};

export const getCategory = (value) => {
  return {
    type: GET_CATEGORY,
    payload: value,
  };
};
