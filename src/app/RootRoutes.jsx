import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import formsRoutes from "./views/forms/FormsRoutes";
import newsRoutes from "./views/news/newsRoutes";

import masterRoutes from "./views/master/masterRoutes";
import newsUpdateRoutes from "./views/newsUpdate/newsUpdateRoutes";
import subscriberRoutes from "./views/subscriber/subscriberRoutes";
import adminUserRoutes from "./views/adminUser/adminUserRoutes";
import settingRoutes from "./views/settingModule/settingRoutes";
import inquiryRoutes from "./views/inquiry/inquiryRoutes";
import aclRoleRoutes from "./views/aclRole/aclRoleRoutes";

import Profile from "./views/Profile/profile";
import { isSession, logoutApi } from "redux/actions/LoginActions";
import Cookies from "js-cookie";
import history from "../history";
const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];
const profileRoute = [
  {
    path: "/profile",
    exact: true,
    component: () => <Profile />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];
const PageNotFoundRoute = [
  {
    component: () => <Redirect to="/404" />,
  },
];

const routes = [
  ...dashboardRoutes,
  ...adminUserRoutes,
  ...aclRoleRoutes,
  ...masterRoutes,
  ...settingRoutes,
  ...newsUpdateRoutes,
  ...subscriberRoutes,
  ...inquiryRoutes,
  ...utilitiesRoutes,
  ...formsRoutes,
  ...profileRoute,
  ...newsRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...errorRoute,
];

const GetRoutes = () => {
  if (Cookies.get("GNTV-SESSIONID")) {
    return routes;
  } else {
    // history.push('/login');
    return [...sessionRoutes, ...redirectRoute, ...PageNotFoundRoute];
  }
};

export default GetRoutes;
