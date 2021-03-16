import {
    getNewsTypeList,getNewsTypeNameList
  } from "../index";
  import { api } from '../../../api/api';

  export const newsTypeListApi = (data) => {
    return async (dispatch) => {
      await api('newsType/search',data, 'post')
        .then((res) => {
          dispatch(getNewsTypeList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };

  //for news module
  export const newsTypeNameListApi = () => {
    return async (dispatch) => {
      await api('newsType/newsTypeNameList',{}, 'get')
        .then((res) => {
          dispatch(getNewsTypeNameList(res.data.data));
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
  