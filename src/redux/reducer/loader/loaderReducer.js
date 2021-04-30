import { SET_LOADER } from "../../actions/types/types";

const initState = {
  loader: false,
};

const LoaderReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return { ...state };
  }
};

export default LoaderReducer;
