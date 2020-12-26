import  {MatxLoadable}  from "../../../components/matx/index";

const country = MatxLoadable({
    loader: () => import("./country/country")
});
const state = MatxLoadable({
    loader: () => import("./state/state")
});
const city = MatxLoadable({
    loader: () => import("./city/city")
});
const newsType = MatxLoadable({
    loader: () => import("./newsType/newsType")
});
const category = MatxLoadable({
    loader: () => import("./category/category")
});
const subCategory = MatxLoadable({
    loader: () => import("./subCategory/subCategory")
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
    {
        path: "/master/newsType",
        component: newsType
    },   
    {
        path: "/master/category",
        component: category
    },   
    {
        path: "/master/subcategory",
        component: subCategory
    },   
]

export default masterRoutes;
