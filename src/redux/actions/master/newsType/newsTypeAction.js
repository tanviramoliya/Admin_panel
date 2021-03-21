export const GET_NEWSTYPE_LIST = "GET_NEWSTYPE_LIST";
export const GET_NEWSTYPE_NAME_LIST = "GET_NEWSTYPE_NAME_LIST";

export const GET_NEWSTYPE = "GET_NEWSTYPE";
export const ADD_NEWSTYPE = "ADD_NEWSTYPE";
export const DELETE_NEWSTYPE = "DELETE_NEWSTYPE";
export const UPDATE_NEWSTYPE = "UPDATE_NEWSTYPE";

export const getNewsTypeList = (value) => {
  return {
    type: GET_NEWSTYPE_LIST,
    payload: value,
  };
};
export const getNewsTypeNameList = (value) => {
  return {
    type: GET_NEWSTYPE_NAME_LIST,
    payload: value,
  };
};
export const addNewsType = (value) => {
  return {
    type: ADD_NEWSTYPE,
    payload: value,
  };
};
export const deleteNewsType = (value) => {
  return {
    type: DELETE_NEWSTYPE,
    payload: value,
  };
};

export const updateNewsType = (value) => {
  return {
    type: UPDATE_NEWSTYPE,
    payload: value,
  };
};

export const getNewsType = (value) => {
  return {
    type: GET_NEWSTYPE,
    payload: value,
  };
};
