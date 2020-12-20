import axios from "axios";

export const GET_COUNTRY_LIST = "GET_COUNTRY_LIST";
export const GET_COUNTRY = "GET_COUNTRY";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";


export const getCountryList = () => (dispatch) => {
  axios.get("http://localhost:8080/country/getAllCountry").then((res) => {
    dispatch({
      type: GET_COUNTRY_LIST,
      payload: res.data,
    });
  });
};

export const addCountry = (countryName) => (dispatch) => {
  axios.post("/api/ecommerce/add-to-cart", { countryName }).then((res) => {
    dispatch({
      type: ADD_COUNTRY,
      payload: res.data,
    });
  });
};

export const deleteCountry = (countryId) => (dispatch) => {
  axios
    .post("/api/ecommerce/delete-from-cart", { countryId })
    .then((res) => {
      dispatch({
        type: DELETE_COUNTRY,
        payload: res.data,
      });
    });
};

export const updateCountry = (countryId, countryName) => (dispatch) => {
  axios
    .post("/api/ecommerce/update-cart-amount", { countryId, countryName })
    .then((res) => {
      dispatch({
        type: UPDATE_COUNTRY,
        payload: res.data,
      });
    });
};

 export const getCountry = (countryId) => (dispatch) => {
      axios.get("/api/ecommerce/get-cart-list", { data: countryId }).then((res) => {
        dispatch({
          type: GET_COUNTRY,
          payload: res.data,
        });
      });
    };