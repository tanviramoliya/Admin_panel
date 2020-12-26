import {
    getNewsTypeList,
  } from "../index";
  const axios = require("axios");
  
  export const newsTypeListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getNewsTypeList(res.data.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 