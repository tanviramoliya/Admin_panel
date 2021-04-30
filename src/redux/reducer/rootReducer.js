import { combineReducers } from "redux";
import LoginReducer from "./auth/loginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
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
import ArticleNewsReducer from "./news/articleNews/articleNewsReducer";
import SocialMediaReducer from "./settingModule/socialMedia/socialMediaReducer";
import AboutUsReducer from "./settingModule/aboutUs/aboutUsReducer";
import InquiryReducer from "./inquiry/inquiryReducer";
import CommentsReducer from "./comments/commentsReducer";

import footerReducer from "./settingModule/footer/footerReducer";
import profileReducer from "./profile/profileReducer";
import LoaderReducer from "./loader/loaderReducer";

const RootReducer = combineReducers({
  toastr: toastrReducer,
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  articleNews : ArticleNewsReducer,
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
  comments : CommentsReducer,
  aclRole : AclRoleReducer,
  footer : footerReducer,
  profile : profileReducer,
  loaders: LoaderReducer,
});

export default RootReducer;
