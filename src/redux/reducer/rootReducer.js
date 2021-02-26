import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import {reducer as toastrReducer} from 'react-redux-toastr';
import LocationReducer from "./master/location/locationReducer";
import NewsTypeReducer from "./master/newsType/newsTypeReducer";
import CategoryReducer from "./master/category/categoryReducer";
import SubCategoryReducer from "./master/subCategory/subCategoryReducer";
import NewsUpdateReducer from "./newsUpdate/newsUpdateReducer";
import SubscriberReducer from "./subscriber/subcscriberReducer"
import AdminUserReducer from "./adminUser/adminUserReducer";
import AclRoleReducer from "./aclRole/aclRoleReducer";
import VideoNewsReducer from "./news/videoNews/videoNewsReducer";
import SocialMediaReducer from "./settingModule/socialMedia/socialMediaReducer";
import AboutUsReducer from "./settingModule/aboutUs/aboutUsReducer";
import InquiryReducer from "./inquiry/inquiryReducer";
import footerReducer from "./settingModule/footer/footerReducer";


const RootReducer = combineReducers({
  toastr: toastrReducer,
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  videoNews : VideoNewsReducer,
  location : LocationReducer,
  newsType : NewsTypeReducer,
  category : CategoryReducer,
  subCategory : SubCategoryReducer,
  newsUpdate : NewsUpdateReducer,
  subscriber : SubscriberReducer,
  adminUser : AdminUserReducer,
  socialMedia : SocialMediaReducer,
  aboutUs : AboutUsReducer,
  inquiry : InquiryReducer,
  aclRole : AclRoleReducer,
  footer : footerReducer
});

export default RootReducer;
