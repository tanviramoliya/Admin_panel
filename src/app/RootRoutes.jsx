import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";


import formsRoutes from "./views/forms/FormsRoutes";

import masterRoutes from "./views/master/masterRoutes";
import newsUpdateRoutes from "./views/newsUpdate/newsUpdateRoutes";
import subscriberRoutes from "./views/subscriber/subscriberRoutes";
import adminUserRoutes from "./views/adminUser/adminUserRoutes";
import settingRoutes from "./views/settingModule/settingRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...adminUserRoutes,
  ...masterRoutes,
  ...settingRoutes,
  ...dashboardRoutes,
  ...newsUpdateRoutes,
  ...subscriberRoutes,
  ...utilitiesRoutes,
  ...formsRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
