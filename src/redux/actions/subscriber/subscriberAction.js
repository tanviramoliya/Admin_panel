export const GET_SUBSCRIBER_LIST = "GET_SUBSCRIBER_LIST";
export const GET_SUBSCRIBER = "GET_SUBSCRIBER";
export const ADD_SUBSCRIBER = "ADD_SUBSCRIBER";
export const DELETE_SUBSCRIBER = "DELETE_SUBSCRIBER";
export const UPDATE_SUBSCRIBER = "UPDATE_SUBSCRIBER";

export const getSubscriberList = (value) => {
  return {
    type: GET_SUBSCRIBER_LIST,
    payload: value,
  };
};
export const addSubscriber = (value) => {
  return {
    type: ADD_SUBSCRIBER,
    payload: value,
  };
};
export const updateSubscriber = (value) => {
  return {
    type: UPDATE_SUBSCRIBER,
    payload: value,
  };
};

export const getSubscriber = (value) => {
  return {
    type: GET_SUBSCRIBER,
    payload: value,
  };
};
