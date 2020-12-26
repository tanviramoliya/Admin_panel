import {
    GET_COUNTRY_LIST,
    GET_COUNTRY,
    ADD_COUNTRY,
    DELETE_COUNTRY,
    UPDATE_COUNTRY,
  } from "../../../actions/master/country/countryActions";
  
  const initialState = {
    countryList: []
  };
  
  const CountryReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_COUNTRY_LIST : {
        return {
          ...state,
          countryList: action.payload
        };
      }
      case GET_COUNTRY : {
        return {
          ...state,
          countryList: [...action.payload]
        };
      }
      case ADD_COUNTRY: {
        return {
          ...state,
          countryList: [...action.payload]
        };
      }
      case DELETE_COUNTRY: {
        return {
          ...state,
          countryList: [...action.payload]
        };
      }
      case UPDATE_COUNTRY: {
        return {
          ...state,
          countryList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default CountryReducer;
  