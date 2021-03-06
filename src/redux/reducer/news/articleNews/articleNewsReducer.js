import {
  GET_ARTICLE_NEWS_LIST,
  GET_ARTICLE_NEWS,
  ADD_ARTICLE_NEWS,
  DELETE_ARTICLE_NEWS,
  UPDATE_ARTICLE_NEWS,
  } from "../../../actions/news/index";
  
  const initialState = {
    articleNewsList: []
  };
  
  const ArticleNewsReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_ARTICLE_NEWS_LIST : {
        return {
          ...state,
          articleNewsList: action.payload
        };
      }
      case GET_ARTICLE_NEWS : {
        return {
          ...state,
          articleNewsList: [...action.payload]
        };
      }
      case ADD_ARTICLE_NEWS: {
        return {
          ...state,
          articleNewsList: [...action.payload]
        };
      }
      case DELETE_ARTICLE_NEWS: {
        return {
          ...state,
          articleNewsList: [...action.payload]
        };
      }
      case UPDATE_ARTICLE_NEWS: {
        return {
          ...state,
          articleNewsList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default ArticleNewsReducer;
  