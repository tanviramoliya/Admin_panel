export const GET_ADMIN_INFO = "GET_ADMIN_INFO";

export const getAdminProfileInfo = (value) => {
  return {
    type: GET_ADMIN_INFO,
    payload: value,
  };
};
