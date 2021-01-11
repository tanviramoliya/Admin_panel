import  {MatxLoadable}  from "../../../components/matx/index";

const socialMedia = MatxLoadable({
    loader: () => import("./socialMedia/socialMedia")
});

const aboutUs = MatxLoadable({
    loader: () => import("./aboutUs/aboutUs")
});
const settingRoutes = [
    {
        path: "/setting/socialMedia",
        component: socialMedia
    },
    {
        path: "/setting/aboutUs",
        component: aboutUs
    }
]

export default settingRoutes;
