import {
    GET_COUNTRY_LIST,
  } from "../../../actions/master/location/locationActions";
  const initialState = {
    countryList: []
  };
  
  const LocationReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_COUNTRY_LIST : {
        return {
          ...state,
          countryList: action.payload
        };
      }
     
    }
  };
  
  export default LocationReducer;
  