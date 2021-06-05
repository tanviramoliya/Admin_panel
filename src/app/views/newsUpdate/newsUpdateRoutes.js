import  {MatxLoadable}  from "../../../components/matx/index";

const newsUpdate = MatxLoadable({
    loader: () => import("./newsUpdate")
});

const newsUpdateRoutes = [
    {
        path: "/newsUpdate",
        component: newsUpdate,
        exact : true,

    }  
]

export default newsUpdateRoutes;
