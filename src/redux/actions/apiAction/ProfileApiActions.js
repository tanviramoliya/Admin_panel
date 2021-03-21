import { getAdminProfileInfo } from "../index";
import { api } from "../../../api/api";


export const getAdminInfo = (data) => {
  return async (dispatch) => {
    await api("profile/get", {} , "get")
      .then((res) => {
        dispatch(getAdminProfileInfo(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const updateAdminInfo = async (data) => {
  const updateAdminInfo = await api(
    `profile/update`,
    data,
    "put"
  );
  if (updateAdminInfo) {
    return updateAdminInfo;
  }
};
export const changeAdminPassApi = async (data) => {
  const changePass = await api(
    `profile/changePassword`,
    data,
    "post"
  );
  if (changePass) {
    return changePass;
  }
};

