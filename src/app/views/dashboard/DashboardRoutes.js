import  {MatxLoadable}  from "../../../components/matx/index";

const Dashboard = MatxLoadable({
  loader: () => import("./dashboard")
})

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard ,
    exact : true,

  }
];

export default dashboardRoutes;
