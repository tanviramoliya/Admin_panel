import {
  GET_SUBSCRIBER_LIST,
  GET_SUBSCRIBER,
  ADD_SUBSCRIBER,
  DELETE_SUBSCRIBER,
  UPDATE_SUBSCRIBER,
  } from "../../actions/subscriber/index";
  
  const initialState = {
    subscriberList: []
  };
  
  const SubscriberReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_SUBSCRIBER_LIST : {
        return {
          ...state,
          subscriberList: action.payload
        };
      }
      case GET_SUBSCRIBER : {
        return {
          ...state,
          subscriberList: [...action.payload]
        };
      }
      case ADD_SUBSCRIBER: {
        return {
          ...state,
          subscriberList: [...action.payload]
        };
      }
      case DELETE_SUBSCRIBER: {
        return {
          ...state,
          subscriberList: [...action.payload]
        };
      }
      case UPDATE_SUBSCRIBER: {
        return {
          ...state,
          subscriberList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default SubscriberReducer;
  