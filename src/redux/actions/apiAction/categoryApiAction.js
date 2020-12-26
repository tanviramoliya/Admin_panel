import {
    getCategoryList,
  } from "../index";
  const axios = require("axios");
  
  export const categoryListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getCategoryList(res.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 