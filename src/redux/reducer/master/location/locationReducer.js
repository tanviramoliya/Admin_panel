import {
    GET_COUNTRY_LIST,GET_STATE_LIST,GET_CITY_LIST
  } from "../../../actions/master/location/locationActions";
  const initialState = {
    countryList: [],
    stateList : [],
    cityList :[]
  };
  
  const LocationReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_COUNTRY_LIST : {
        return {
          ...state,
          countryList: action.payload
        };
      }
      case GET_STATE_LIST : {
        return {
          ...state,
          stateList: action.payload
        };
      }
      case GET_CITY_LIST : {
        return {
          ...state,
          cityList: action.payload
        };
      }
      default: {
        return {
          ...state
        };
      }
     
    }
  };
  
  export default LocationReducer;
  