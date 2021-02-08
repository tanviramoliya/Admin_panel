export const GET_INQUIRY_LIST = "GET_INQUIRY_LIST";
export const GET_INQUIRY = "GET_INQUIRY";
export const ADD_INQUIRY= "ADD_INQUIRY";
export const DELETE_INQUIRY = "DELETE_INQUIRY";
export const SUBMIT_REPLY= "SUBMIT_REPLY";

export const getInquiryList = (value) => {
  return {
    type: GET_INQUIRY_LIST,
    payload: value,
  };
};
export const submitReply = (value) => {
  return {
    type: SUBMIT_REPLY,
    payload: value,
  };
};
export const addInquiry = (value) => {
  return {
    type: ADD_INQUIRY,
    payload: value,
  };
};
export const getInquiry= (value) => {
  return {
    type: GET_INQUIRY,
    payload: value,
  };
};
