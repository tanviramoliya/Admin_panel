import  {MatxLoadable}  from "../../../components/matx/index";

const comments = MatxLoadable({
    loader: () => import("./comments")
});

const commentsRoutes = [
    {
        path: "/comments",
        component: comments
    }  
]

export default commentsRoutes;