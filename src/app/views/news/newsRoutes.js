import { MatxLoadable } from "components/matx/MatxLoadable/MatxLoadable";

const videoNews = MatxLoadable({
    loader: () => import("./videoNews/videoNews")
});

const newsRoutes = [
    {
        path: "/news/videoNews",
        component: videoNews
    } 
   
]

export default newsRoutes;
