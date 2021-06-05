import  {MatxLoadable}  from "../../../components/matx/index";

const aclRole = MatxLoadable({
    loader: () => import("./aclRole")
});

const aclRoleRoutes = [
    {
        path: "/role",
        component: aclRole,
        exact : true,

    }  
]

export default aclRoleRoutes;
