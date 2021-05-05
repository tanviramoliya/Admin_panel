export const GET_COMMENTS_LIST = "GET_COMMENTS_LIST";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENTS = "DELETE_COMMENTS";

export const getCommentsList = (value) => {
  return {
    type: GET_COMMENTS_LIST,
    payload: value,
  };
};
export const getComments= (value) => {
  return {
    type: GET_COMMENTS,
    payload: value,
  };
};
