import  {MatxLoadable}  from "../../../components/matx/index";

const inquiry = MatxLoadable({
    loader: () => import("./inquiry")
});

const inquiryRoutes = [
    {
        path: "/inquiry",
        component: inquiry
    }  
]

export default inquiryRoutes;
