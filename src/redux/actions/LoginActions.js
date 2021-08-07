import { setLoginFlag} from "./auth/loginAction";
import { setLoader } from "./loaderAction/loaderAction";
import { api } from "../../api/api";
import { toastr } from "react-redux-toastr";
import history from "../../history";
import { status } from "../../utility/config";
import Cookies from "js-cookie";

export const loginApi = (loginData) => {
  return async (dispatch, store) => {
    dispatch(setLoader(true));
    await api("userUtility/authenticate", loginData, "post").then((res) => {
      if (res.data.code === status.success) {        
        //Cookies.set("JSESSIONID", res.data.data.JSESSIONID);
        Cookies.set("GNTV-SESSIONID", res.data.data.JSESSIONID);
        localStorage.setItem("permission",JSON.stringify(res.data.data.permission));
        localStorage.setItem("roleToken",res.data.data.roleToken);
        localStorage.setItem("userName",JSON.stringify(res.data.data.name));
        toastr.success("Logged in successfully");
        dispatch(setLoginFlag(true));
        history.push("/dashboard");
      } else if (res && res.data.code === status.badRequest) {
        toastr.warning(res.data.message);
      } else {
        toastr.error(res.data.message);
      }
    });
    dispatch(setLoader(false));
  };
};

export const isSession = () => {
  return {
    status: true,
  };
};

export const checkEmailApi = async (data) => {
  const checkMail = await api("userUtility/checkMail", data, "post");
  if (checkMail) {
    return checkMail;
  }
};

export const sendPasscodeApi = async (data) => {
  const checkMail = await api("userUtility/sendPasscode", data, "post");
  if (checkMail) {
    return checkMail;
  }
};

export const validPasscodeApi = async (data) => {
  const validPasscode = await api("userUtility/validatePasscode", data, "post");
  if (validPasscode) {
    return validPasscode;
  }
};
export const resetPasswordApi = async (data) => {
  const resetPasscword = await api("userUtility/resetPassword", data, "post");
  if (resetPasscword) {
    return resetPasscword;
  }
};

export const logoutApi = () => {
  return async (dispatch, store) => {
    dispatch(setLoader(true));
    await api("userUtility/logout", {}, "get").then((res) => {
      Cookies.remove("GNTV-SESSIONID");
      localStorage.removeItem("permission");
      localStorage.removeItem("roleToken");
      localStorage.removeItem("useName");
      dispatch(setLoginFlag(false));
      history.push("/login");
      toastr.success(res.data.message);
      dispatch(setLoader(false));
    });
  };
};

export const checkLoginApi = () => {
  return async (dispatch, store) => {
    let data = new FormData();
    data.append("gntvSessionId",Cookies.get("GNTV-SESSIONID"));

    await api("userUtility/isLogin", data, "postWithUrlEncoded").then((res) => {
      if(!res.data){
        dispatch(logoutApi());
      }
    });
  };
};

