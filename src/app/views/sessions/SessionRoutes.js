import LogIn from "./Login";
import ForgotPassword from "./ForgotPassword";
import NotFound from './NotFound';
import PageNotFound from './PageNotFound';

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false,
    },
    leftSidebar: {
      show: false,
      mode: "close",
    },
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false,
    },
    navbar: { show: false },
  },
  secondarySidebar: { show: false },
  footer: { show: false },
};

const sessionRoutes = [
  {
    path: "/login",
    component: LogIn,
    exact : true,
    settings,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact : true,
    settings,
  },

  {
    path: "/session/404",
    component: NotFound,
    exact : true,
    settings,
  },
  {
    path : '/404',
    component : PageNotFound,
    exact : true,
    settings
  }
];

export default sessionRoutes;
