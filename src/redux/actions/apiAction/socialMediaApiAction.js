import { getSocialMediaList } from "../index";
import { api } from "../../../api/api";
import { toastr } from "react-redux-toastr";

export const socialMediaListApi = () => {
  return async (dispatch) => {
    await api("socialMedia/getAll", {}, "get")
      .then((res) => {
        dispatch(getSocialMediaList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        toastr.error('Can not able to get social Media list');
      });
  };
};

export const updateSocialMediaApi = async (data) => {
  const updateSocialMedia = await api(
    `socialMedia/updateSocialMedia`,
    data,
    "put"
  );
  if (updateSocialMedia) {
    return updateSocialMedia;
  }
};