import { getFooterList } from "../index";
import { api } from "../../../api/api";
import { toastr } from "react-redux-toastr";

export const footerListApi = () => {
  return async (dispatch) => {
    await api("footer/getAll", {}, "get")
      .then((res) => {
        dispatch(getFooterList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        toastr.error('Can not able to get about us list');
      });
  };
};

export const updateFooterApi = async (data) => {
  const updateFooter = await api(
    `footer/updateFooter`,
    data,
    "put"
  );
  if (updateFooter) {
    return updateFooter;
  }
};