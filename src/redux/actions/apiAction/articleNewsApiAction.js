import { getArticleNewsList } from "../index";
import { api } from "../../../api/api";


export const articleNewsListApi = () => {
  return async (dispatch) => {
    await api("article/getTableData", {}, "get")
      .then((res) => {
        dispatch(getArticleNewsList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const deleteArticleNewsApi = async (id) => {
  const deleteArticleNews = await api(
    `article/deleteArticleNews?aId=${id}`,
    {},
    "delete"
  );
  if (deleteArticleNews) {
    return deleteArticleNews;
  }
};
export const addArticleNewsApi = async (data) => {
  const createArticleNews = await api(
    "article/uploadArticleNews",
    data,
    "postWithUrlEncoded"
  );
  if (createArticleNews) {
    return createArticleNews;
  }
};

export const updateArticleNewsApi = async (data) => {
  const updateArticleNews = await api(
    `article/updateArticleNews`,
    data,
    "postWithUrlEncoded"
  );
  if (updateArticleNews) {
    return updateArticleNews;
  }
};

export const getSingleArticleNewsApi = async (id) => {
  const getSingleArticleNews = await api(
    `article/getArticleNews?aId=${id}`,
    {},
    "get"
  );
  if (getSingleArticleNews) {
    return getSingleArticleNews;
  }
};