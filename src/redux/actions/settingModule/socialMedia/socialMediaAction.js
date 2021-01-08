export const GET_SOCIALMEDIA_LIST = "GET_SOCIALMEDIA_LIST";
export const UPDATE_SOCIALMEDIA = "UPDATE_SOCIALMEDIA";

export const getSocialMediaList = (value) => {
  return {
    type: GET_SOCIALMEDIA_LIST,
    payload: value,
  };
};

export const updateSocialMedia = (value) => {
  return {
    type: UPDATE_SOCIALMEDIA,
    payload: value,
  };
};

