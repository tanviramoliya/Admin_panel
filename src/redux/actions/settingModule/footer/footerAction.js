export const GET_FOOTER_LIST = "GET_FOOTER_LIST";
export const UPDATE_FOOTER = "UPDATE_FOOTER";

export const getFooterList = (value) => {
  return {
    type: GET_FOOTER_LIST,
    payload: value,
  };
};

export const updateFooter = (value) => {
  return {
    type: UPDATE_FOOTER,
    payload: value,
  };
};

