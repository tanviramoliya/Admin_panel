import { api } from "../../../api/api";


export const getAdminCount = async () => {
  const adminCount = await api("dashBoard/getAdminCount", {} , "get");
    if (adminCount) {
        return adminCount;
      }
      
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

