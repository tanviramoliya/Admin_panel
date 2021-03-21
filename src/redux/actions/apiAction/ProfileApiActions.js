import { getAdminProfileInfo } from "../index";
import { api } from "../../../api/api";


export const getAdminInfo = (data) => {
  return async (dispatch) => {
    await api("admin/search", data , "post")
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
  const updateAdminUser = await api(
    `admin/updateAdmin`,
    data,
    "put"
  );
  if (updateAdminUser) {
    return updateAdminUser;
  }
};

