import  {MatxLoadable}  from "../../../components/matx/index";


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
