export const GET_NEWS_LIST = "GET_NEWS_LIST";
export const GET_NEWS = "GET_NEWS";
export const ADD_NEWS = "ADD_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";
export const UPDATE_NEWS = "UPDATE_NEWS";

export const getNewsList = (value) => {
  return {
    type: GET_NEWS_LIST,
    payload: value,
  };
};
export const addNews = (value) => {
  return {
    type: ADD_NEWS,
    payload: value,
  };
};
// export const deleteCountry = (value) => {
//   return {
//     type: DELETE_COUNTRY,
//     payload: value,
//   };
// };

export const updateNews = (value) => {
  return {
    type: UPDATE_NEWS,
    payload: value,
  };
};

export const getNews = (value) => {
  return {
    type: GET_NEWS,
    payload: value,
  };
};
