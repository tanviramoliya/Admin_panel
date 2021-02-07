import { getAclRoleList } from "../index";
import { api } from "../../../api/api";


export const aclRoleListApi = () => {
  return async (dispatch) => {
    await api("ACL/getAll", {}, "get")
      .then((res) => {
        dispatch(getAclRoleList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const deleteAclRoleApi = async (id) => {
  const deleteAclRole = await api(
    `ACL/deleteAclRole?roleToken=${id}`,
    {},
    "delete"
  );
  if (deleteAclRole) {
    return deleteAclRole;
  }
};
export const addAclRoleApi = async (data) => {
  const createAclRole = await api(
    "ACL/addRole",
    data,
    "post"
  );
  if (createAclRole) {
    return createAclRole;
  }
};

export const updateAclRoleApi = async (data) => {
  const updateAclRole = await api(
    `ACL/updateRole`,
    data,
    "put"
  );
  if (updateAclRole) {
    return updateAclRole;
  }
};