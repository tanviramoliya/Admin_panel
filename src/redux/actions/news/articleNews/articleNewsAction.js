export const GET_ARTICLE_NEWS_LIST = "GET_ARTICLE_NEWS_LIST";
export const GET_ARTICLE_NEWS = "GET_ARTICLE_NEWS";
export const ADD_ARTICLE_NEWS = "ADD_ARTICLE_NEWS";
export const DELETE_ARTICLE_NEWS = "DELETE_ARTICLE_NEWS";
export const UPDATE_ARTICLE_NEWS = "UPDATE_ARTICLE_NEWS";

export const getArticleNewsList = (value) => {
  return {
    type: GET_ARTICLE_NEWS_LIST,
    payload: value,
  };
};
export const addArticleNews = (value) => {
  return {
    type: ADD_ARTICLE_NEWS,
    payload: value,
  };
};
export const deleteArticleNews = (value) => {
  return {
    type: DELETE_ARTICLE_NEWS,
    payload: value,
  };
};

export const updateArticleNews = (value) => {
  return {
    type: UPDATE_ARTICLE_NEWS,
    payload: value,
  };
};

export const getArticleNews = (value) => {
  return {
    type: GET_ARTICLE_NEWS,
    payload: value,
  };
};
