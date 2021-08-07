import {
  getCommentsList,
  } from "../index";
  import { api } from '../../../api/api';

  export const commentsListApi = (data) => {
    return async (dispatch) => {
      await api('newsComment/search', data, 'post')
        .then((res) => {
          dispatch(getCommentsList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get Category list');
        });
    };
  };

  export const deleteCommentsApi = async (data) => {
    const deletecomments = await api(`newsComment/deleteComment`, data, 'delete');
    if (deletecomments) {
      return deletecomments;
    }
  };
  export const changeCommentStatusApi = async (data) => {
    const changeStatus = await api(`newsComment/changeStatus`, data, 'postWithUrlEncoded');
    if (changeStatus) {
      return changeStatus;
    }
  };

  export const getCommentCountApi = async (data) => {
    const commentCount = await api(`newsComment/getCountById?newsId=${data}`, {}, 'get');

    if (commentCount) {
      return commentCount;
    }
  };
  