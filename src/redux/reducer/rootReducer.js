import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";

import CountryReducer from "./master/country/countryReducer";
import StateReducer from "./master/state/stateReducer";
import CityReducer from "./master/city/cityReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  country : CountryReducer,
  state : StateReducer,
  city : CityReducer
});

export default RootReducer;
