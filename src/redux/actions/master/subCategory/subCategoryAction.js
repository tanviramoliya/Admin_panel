export const GET_SUBCATEGORY_LIST = "GET_SUBCATEGORY_LIST";
export const GET_SUBCATEGORY = "GET_SUBCATEGORY";
export const ADD_SUBCATEGORY = "ADD_SUBCATEGORY";
export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY";
export const UPDATE_SUBCATEGORY = "UPDATE_SUBCATEGORY";

export const getSubCategoryList = (value) => {
  return {
    type: GET_SUBCATEGORY_LIST,
    payload: value,
  };
};
export const addSubCategory = (value) => {
  return {
    type: ADD_SUBCATEGORY,
    payload: value,
  };
};
export const deleteSubCategory = (value) => {
  return {
    type: DELETE_SUBCATEGORY,
    payload: value,
  };
};

export const updateSubCategory = (value) => {
  return {
    type: UPDATE_SUBCATEGORY,
    payload: value,
  };
};

export const getSubCategory = (value) => {
  return {
    type: GET_SUBCATEGORY,
    payload: value,
  };
};
