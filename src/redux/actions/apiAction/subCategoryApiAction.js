import {
    getSubCategoryList,
  } from "../index";
  import { api } from '../../../api/api';

  export const subCategoryListApi = () => {
    return async (dispatch) => {
      await api('subCategory/getAllSubCategory', {}, 'get')
        .then((res) => {
          dispatch(getSubCategoryList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };
  
  export const deleteSubCategoryApi = async (id) => {
    const deleteSubCategory = await api(`subCategory/deleteSubCategory?subCategoryToken=${id}`, {}, 'delete');
    if (deleteSubCategory) {
      return deleteSubCategory;
    }
  };