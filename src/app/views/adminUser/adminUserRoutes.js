import  {MatxLoadable}  from "../../../components/matx/index";

const adminUser = MatxLoadable({
    loader: () => import("./adminUser")
});

const adminUserRoutes = [
    {
        path: "/adminUser",
        component: adminUser
    }  
]

export default adminUserRoutes;
