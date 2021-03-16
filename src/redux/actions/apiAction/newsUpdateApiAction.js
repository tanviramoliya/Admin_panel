import {
  getNewsList,
  } from "../index";
  import { api } from '../../../api/api';

  export const newsListApi = (data) => {
    return async (dispatch) => {
      await api('newsHeadLine/search', data, 'post')
        .then((res) => {
          dispatch(getNewsList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get Category list');
        });
    };
  };

  export const deleteNewsApi = async (id) => {
    const deleteNews = await api(`newsHeadLine/deleteNewsHeadline?headLineToken=${id}`, {}, 'delete');
    if (deleteNews) {
      return deleteNews;
    }
  };
  export const addNewsApi = async (data) => {
    const createNews = await api(
      "newsHeadLine/addNewsHeadline",
      data,
      "post"
    );
    if (createNews) {
      return createNews;
    }
  };
  
  export const updateNewsApi = async (data) => {
    const updateNews = await api(
      `newsHeadLine/updateNewsHeadline`,
      data,
      "put"
    );
    if (updateNews) {
      return updateNews;
    }
  };
  export const changeStatusApi = async (data) => {
    const changeStatus = await api(`newsHeadLine/changeStatus`, data, 'postWithUrlEncoded');
    if (changeStatus) {
      return changeStatus;
    }
  };