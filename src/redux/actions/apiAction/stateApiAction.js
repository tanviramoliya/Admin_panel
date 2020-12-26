import {
    getStateList,
  } from "../index";
  const axios = require("axios");
  
  export const stateListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getStateList(res.data.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 