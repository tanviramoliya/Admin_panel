import { getVideoNewsList } from "../index";
import { api } from "../../../api/api";


export const videoNewsListApi = () => {
  return async (dispatch) => {
    await api("video/getTableData", {}, "get")
      .then((res) => {
        dispatch(getVideoNewsList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const deleteVideoNewsApi = async (id) => {
  const deleteVideoNews = await api(
    `video/deleteVideoNews?vId=${id}`,
    {},
    "delete"
  );
  if (deleteVideoNews) {
    return deleteVideoNews;
  }
};
export const addVideoNewsApi = async (data) => {
  const createVideoNews = await api(
    "video/uploadVideoNews",
    data,
    "post"
  );
  if (createVideoNews) {
    return createVideoNews;
  }
};

export const updateVideoNewsApi = async (data) => {
  const updateVideoNews = await api(
    `video/updateVideoNews`,
    data,
    "put"
  );
  if (updateVideoNews) {
    return updateVideoNews;
  }
};

export const getSingleVideoNewsApi = async (id) => {
  const getSingleVideoNews = await api(
    `video/getVideoNews?vId=${id}`,
    {},
    "get"
  );
  if (getSingleVideoNews) {
    return getSingleVideoNews;
  }
};