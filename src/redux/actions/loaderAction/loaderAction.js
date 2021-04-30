import { SET_LOADER } from "../types/types";

export const setLoader = (value) => {
  return {
    type: SET_LOADER,
    payload: value,
  };
};
