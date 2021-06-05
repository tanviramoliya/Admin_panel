import { SET_LOGIN_USER, SET_LOGIN_FLAG } from "../../actions/types/types";

const initState = {
  userRole: "",
  loginUser: {},
  loginFlag: false,
};

const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload.data,
        loginErrorFlag: false,
      };
    case SET_LOGIN_FLAG:
      return { ...state, loginFlag: action.payload.data };
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    default:
      return { ...state };
  }
};

export default LoginReducer;