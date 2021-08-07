import {
  SET_LAYOUT_SETTINGS,
  SET_DEFAULT_LAYOUT_SETTINGS,SET_NAME_SETTINGS
} from "../actions/LayoutActions";
import { MatxLayoutSettings } from "../../app/MatxLayout/settings";

const initialState = {
  settings: {
    ...MatxLayoutSettings
  },
  defaultSettings: {
    ...MatxLayoutSettings
  },
  nameSettings : false
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAYOUT_SETTINGS:
      return {
        ...state,
        settings: { ...action.data }
      };
    case SET_DEFAULT_LAYOUT_SETTINGS:
      return {
        ...state,
        defaultSettings: { ...action.data }
      };
      case SET_NAME_SETTINGS:
      return {
        ...state,
        nameSettings:action.data 
            };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
