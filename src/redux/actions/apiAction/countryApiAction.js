import {
    getCountryList,
  } from "../index";
  const axios = require("axios");
  
  export const countryListApi = () => {
    return async (dispatch, store) => {
        await axios.get("https://gorest.co.in/public-api/posts").then((res) => {
                dispatch(getCountryList(res.data.data));
              })
              .catch((err) => {
                  console.log(err);
              })
    };
  };
  
 