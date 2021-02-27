import { getAdminUserList,getAdminNameList } from "../index";
import { api } from "../../../api/api";


export const adminUserListApi = () => {
  return async (dispatch) => {
    await api("admin/getAllAdmin", {}, "get")
      .then((res) => {
        dispatch(getAdminUserList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const deleteAdminUserApi = async (id) => {
  const deleteAdminUser = await api(
    `admin/deleteAdmin?adminToken=${id}`,
    {},
    "delete"
  );
  if (deleteAdminUser) {
    return deleteAdminUser;
  }
};
export const addAdminUserApi = async (data) => {
  const createAdminUser = await api(
    "admin/addAdmin",
    data,
    "post"
  );
  if (createAdminUser) {
    return createAdminUser;
  }
};

export const updateAdminUserApi = async (data) => {
  const updateAdminUser = await api(
    `admin/updateAdmin`,
    data,
    "put"
  );
  if (updateAdminUser) {
    return updateAdminUser;
  }
};

export const getAdminNameListApi = () => {
  return async (dispatch) => {
    await api(`admin/getAdminNameList`,{},
    "get")
      .then((res) => {
        dispatch(getAdminNameList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};
