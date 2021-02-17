export const GET_VIDEO_NEWS_LIST = "GET_VIDEO_NEWS_LIST";
export const GET_VIDEO_NEWS = "GET_VIDEO_NEWS";
export const ADD_VIDEO_NEWS = "ADD_VIDEO_NEWS";
export const DELETE_VIDEO_NEWS = "DELETE_VIDEO_NEWS";
export const UPDATE_VIDEO_NEWS = "UPDATE_VIDEO_NEWS";

export const getVideoNewsList = (value) => {
  return {
    type: GET_VIDEO_NEWS_LIST,
    payload: value,
  };
};
export const addVideoNews = (value) => {
  return {
    type: ADD_VIDEO_NEWS,
    payload: value,
  };
};
export const deleteVideoNews = (value) => {
  return {
    type: DELETE_VIDEO_NEWS,
    payload: value,
  };
};

export const updateVideoNews = (value) => {
  return {
    type: UPDATE_VIDEO_NEWS,
    payload: value,
  };
};

export const getVideoNews = (value) => {
  return {
    type: GET_VIDEO_NEWS,
    payload: value,
  };
};
