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

const articleNews = MatxLoadable({
    loader: () => import("./articleNews/articleNews")
});

const addUpdateArticleNews = MatxLoadable({
    loader: () => import("./articleNews/addUpdateArticleNews")
});
const viewArticleNews = MatxLoadable({
    loader: () => import("./articleNews/viewArticleNews")
});

const newsRoutes = [
    {
        path: "/news/videoNews",
        component: videoNews,
        exact : true
    },
    {
        path: "/news/videoNews/edit",
        component: addUpdateVideoNews,
        exact : true
    },
    {
        path: "/news/videoNews/view",
        component: viewVideoNews,
        exact : true
    },
   
    {
        path: "/news/articleNews",
        component: articleNews,
        exact : true
    },
    {
        path: "/news/articleNews/edit",
        component: addUpdateArticleNews,
        exact : true
    },
    {
        path: "/news/articleNews/view",
        component: viewArticleNews,
        exact : true
    },
]

export default newsRoutes;
