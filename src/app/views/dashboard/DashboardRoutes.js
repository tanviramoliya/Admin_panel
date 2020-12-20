import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Dashboard = MatxLoadable({
  loader: () => import("./dashboard")
})

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard ,
    auth: authRoles.admin
  }
];

export default dashboardRoutes;
