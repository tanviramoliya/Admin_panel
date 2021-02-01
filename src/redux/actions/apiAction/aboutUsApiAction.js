import { getAboutUsList } from "../index";
import { api } from "../../../api/api";
import { toastr } from "react-redux-toastr";

export const aboutUsListApi = () => {
  return async (dispatch) => {
    await api("aboutUs/getAll", {}, "get")
      .then((res) => {
        dispatch(getAboutUsList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        toastr.error('Can not able to get about us list');
      });
  };
};

export const updateAboutUsApi = async (data) => {
  console.log(data);
  const updateAboutUs = await api(
    `aboutUs/updateAboutUs`,
    data,
    "put"
  );
  if (updateAboutUs) {
    return updateAboutUs;
  }
};