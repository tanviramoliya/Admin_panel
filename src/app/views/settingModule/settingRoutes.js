import  {MatxLoadable}  from "../../../components/matx/index";

const socialMedia = MatxLoadable({
    loader: () => import("./socialMedia/socialMedia")
});

const settingRoutes = [
    {
        path: "/setting/socialMedia",
        component: socialMedia
    }
]

export default settingRoutes;
