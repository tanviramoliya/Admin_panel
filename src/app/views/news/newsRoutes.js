import { MatxLoadable } from "../../../components/matx/index";

const videoNews = MatxLoadable({
    loader: () => import("./videoNews/videoNews")
});

const newsRoutes = [
    {
        path: "/news/videoNews",
        component: videoNews
    },
   
]

export default newsRoutes;
