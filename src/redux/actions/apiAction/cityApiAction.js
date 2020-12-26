import {
    getCityList,
  } from "../index";
  const axios = require("axios");
  
  export const cityListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getCityList(res.data.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 