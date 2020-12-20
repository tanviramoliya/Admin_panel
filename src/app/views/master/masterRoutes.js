import { MatxLoadable } from "matx";

const country = MatxLoadable({
    loader: () => import("./country/country")
});
const state = MatxLoadable({
    loader: () => import("./state/state")
});
const city = MatxLoadable({
    loader: () => import("./city/city")
});
const masterRoutes = [
    {
        path: "/master/country",
        component: country
    },   
    {
        path: "/master/state",
        component: state
    },   
    {
        path: "/master/city",
        component: city
    },   
]

export default masterRoutes;
