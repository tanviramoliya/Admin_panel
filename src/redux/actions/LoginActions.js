// import jwtAuthService from "../../app/services/jwtAuthService";
// import { setUserData } from "./UserActions";
// import history from "history.js";

// export const LOGIN_ERROR = "LOGIN_ERROR";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_LOADING = "LOGIN_LOADING";
// export const RESET_PASSWORD = "RESET_PASSWORD";

import { setLoginFlag, setLoginUser, changeRole } from "./auth/loginAction"
// import { setLoader } from "../loaderAction/loaderAction";
import { api } from "../../api/api";
import { toastr } from "react-redux-toastr";
import  history  from "../../history";
import { status } from "../../utility/config";



export const loginApi = (loginData) => {
  return async (dispatch, store) => {
  // dispatch(setLoader(true));
  console.log(loginData);
  await  api("userUtility/authenticate", loginData, "post").then((res) => {
    console.log(res);
      if (res.data.code === status.success) {
      
          dispatch(setLoginUser(res.data.data));
          localStorage.setItem("GNTV", JSON.stringify(res.data.data));
          dispatch(setLoginFlag(true));
          //dispatch(changeRole(res.data.data.role));
          toastr.success("Logged in successfully");
          history.replace('/dashboard');
      }
      else if (res && res.data.code === status.badRequest) {
        toastr.warning(res.data.message);
      }
      else {
        toastr.error(res.data.message);
      }
    })
    // dispatch(setLoader(false));
  };
};


export const checkEmailApi = async (data) => {
  const checkMail = await api(
    "userUtility/checkMail",
    data,
    "post"
  );
  if (checkMail) {
    return checkMail;
  }
};

export const sendPasscodeApi = async (data) => {
  const checkMail = await api(
    "userUtility/sendPasscode",
    data,
    "post"
  );
  if (checkMail) {
    return checkMail;
  }
};

export const validPasscodeApi = async (data) => {
  const validPasscode = await api(
    "userUtility/validatePasscode",
    data,
    "post"
  );
  if (validPasscode) {
    return validPasscode;
  }
};
export const resetPasswordApi = async (data) => {
  const resetPasscword = await api(
    "userUtility/resetPassword",
    data,
    "post"
  );
  if (resetPasscword) {
    return resetPasscword;
  }
};

export const logoutApi = (value) => {
  return async (dispatch, store) => {
    dispatch(setLoginUser(value));
    localStorage.removeItem("GNTV");
    dispatch(setLoginFlag(false));
    history.push("/login");
  };
};
// export function loginWithEmailAndPassword({ email, password }) {
//   return dispatch => {
//     dispatch({
//       type: LOGIN_LOADING
//     });

//     jwtAuthService
//       .loginWithEmailAndPassword(email, password)
//       .then(user => {
//         dispatch(setUserData(user));

//         history.push({
//           pathname: "/"
//         });

//         return dispatch({
//           type: LOGIN_SUCCESS
//         });
//       })
//       .catch(error => {
//         return dispatch({
//           type: LOGIN_ERROR,
//           payload: error
//         });
//       });
//   };
// }

// export function resetPassword({ email }) {
//   return dispatch => {
//     dispatch({
//       payload: email,
//       type: RESET_PASSWORD
//     });
//   };
// }
