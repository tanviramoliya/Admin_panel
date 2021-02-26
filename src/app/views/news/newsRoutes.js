import { MatxLoadable } from "../../../components/matx/index";

const videoNews = MatxLoadable({
    loader: () => import("./videoNews/videoNews")
});

const addUpdateVideoNews = MatxLoadable({
    loader: () => import("./videoNews/addUpdateVideoNews")
});
const viewVideoNews = MatxLoadable({
    loader: () => import("./videoNews/viewVideoNews")
});

const newsRoutes = [
    {
        path: "/news/videoNews",
        component: videoNews,
        exact : true
    },
    {
        path: "/news/videoNews/edit",
        component: addUpdateVideoNews
    },
    {
        path: "/news/videoNews/view",
        component: viewVideoNews
    },
   
]

export default newsRoutes;
