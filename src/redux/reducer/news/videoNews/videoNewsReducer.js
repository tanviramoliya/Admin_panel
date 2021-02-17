import {
  GET_VIDEO_NEWS_LIST,
  GET_VIDEO_NEWS,
  ADD_VIDEO_NEWS,
  DELETE_VIDEO_NEWS,
  UPDATE_VIDEO_NEWS,
  } from "../../../actions/news/index";
  
  const initialState = {
    videoNewsList: []
  };
  
  const VideoNewsReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEO_NEWS_LIST : {
        return {
          ...state,
          adminUserList: action.payload
        };
      }
      case GET_VIDEO_NEWS : {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case ADD_VIDEO_NEWS: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case DELETE_VIDEO_NEWS: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      case UPDATE_VIDEO_NEWS: {
        return {
          ...state,
          adminUserList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default VideoNewsReducer;
  