import  {MatxLoadable}  from "../../../components/matx/index";

const subcriber = MatxLoadable({
    loader: () => import("./subscriber")
});

const subcriberRoutes = [
    {
        path: "/subscriber",
        component: subcriber,
        exact : true,

    }  
]

export default subcriberRoutes;
