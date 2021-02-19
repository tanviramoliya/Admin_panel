import { MatxLoadable } from "../../../components/matx/index";

const videoNews = MatxLoadable({
    loader: () => import("./videoNews/videoNews")
});

const addUpdateVideoNews = MatxLoadable({
    loader: () => import("./videoNews/addUpdateVideoNews")
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
   
]

export default newsRoutes;
