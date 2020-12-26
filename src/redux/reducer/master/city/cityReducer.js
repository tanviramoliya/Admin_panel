import {
    GET_CITY_LIST,
    GET_CITY,
    ADD_CITY,
    DELETE_CITY,
    UPDATE_CITY,
  } from "../../../actions/master/city/cityAction";
  
  const initialState = {
    cityList: []
  };
  
  const CityReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_CITY_LIST : {
        return {
          ...state,
          cityList: action.payload
        };
      }
      case GET_CITY : {
        return {
          ...state,
          cityList: [...action.payload]
        };
      }
      case ADD_CITY: {
        return {
          ...state,
          cityList: [...action.payload]
        };
      }
      case DELETE_CITY: {
        return {
          ...state,
          cityList: [...action.payload]
        };
      }
      case UPDATE_CITY: {
        return {
          ...state,
          cityList: [...action.payload]
        };
      }
      default: {
        return {
          ...state
        };
      }
    }
  };
  
  export default CityReducer;
  