import  {MatxLoadable}  from "../../../components/matx/index";

const socialMedia = MatxLoadable({
    loader: () => import("./socialMedia/socialMedia")
});

const aboutUs = MatxLoadable({
    loader: () => import("./aboutUs/aboutUs")
});
const footer = MatxLoadable({
    loader: () => import("./footer/footer")
});
const settingRoutes = [
    {
        path: "/setting/socialMedia",
        component: socialMedia,
        exact : true,

    },
    {
        path: "/setting/aboutUs",
        component: aboutUs,
        exact : true,

    },
    {
        path: "/setting/footer",
        component: footer,
        exact : true,

    }
]

export default settingRoutes;
