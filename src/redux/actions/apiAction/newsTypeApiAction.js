import {
    getNewsTypeList,
  } from "../index";
  import { api } from '../../../api/api';

  export const newsTypeListApi = () => {
    return async (dispatch) => {
      await api('newsType/getAllNewsType', {}, 'get')
        .then((res) => {
          dispatch(getNewsTypeList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };
  
  export const deleteNewsTypeApi = async (id) => {
    const deleteNewsType = await api(`newsType/deleteNewsType?newsTypeToken=${id}`, {}, 'delete');
    if (deleteNewsType) {
      return deleteNewsType;
    }
  };
  export const addNewsTypeApi = async (data) => {
    const createNewsType = await api(
      "newsType/addNewsType",
      data,
      "post"
    );
    if (createNewsType) {
      return createNewsType;
    }
  };
  
  export const updateNewsTypeApi = async (data) => {
    const updateNewsType = await api(
      `newsType/updateNewsType`,
      data,
      "put"
    );
    if (updateNewsType) {
      return updateNewsType;
    }
  };
  