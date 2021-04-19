import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
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
  ...adminUserRoutes,
  ...aclRoleRoutes,
  ...masterRoutes,
  ...settingRoutes,
  ...dashboardRoutes,
  ...newsUpdateRoutes,
  ...subscriberRoutes,
  ...inquiryRoutes,
  ...formsRoutes,
  ...profileRoute,
  ...newsRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...errorRoute,
  ...PageNotFoundRoute
];


export default routes;
