import {
    getSubCategoryList,
  } from "../index";
  const axios = require("axios");
  
  export const subCategoryListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getSubCategoryList(res.data.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 