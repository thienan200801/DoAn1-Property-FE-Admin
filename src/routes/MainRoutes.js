import { Navigate } from "react-router-dom";
import Contacts from "~/pages/Contacts";
import EditProjectPost from "~/pages/EditProjectPost";
import EditProperty from "~/pages/EditProperty";
import EditPost from "~/pages/EditPost";
import Home from "~/pages/Home";
import NewProjectPost from "~/pages/NewProjectPost";
import NewProperty from "~/pages/NewProperty";
import NewPost from "~/pages/NewPost";
import NotFound from "~/pages/NotFound";
import ProjectPosts from "~/pages/ProjectPosts";
import Properties from "~/pages/Properties";
import Posts from "~/pages/Posts";
import AuthGuard from "./AuthGuard";

const MainRoutes = () => {
  return {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/danh-sach-tai-san-ban",
        element: <Properties />,
      },
      {
        path: "/danh-sach-tai-san-ban/tao-moi",
        element: <NewProperty />,
      },
      {
        path: "/danh-sach-tai-san-ban/chinh-sua/:slug",
        element: <EditProperty />,
      },
      {
        path: "/gioi-thieu-du-an",
        element: <ProjectPosts />,
      },
      {
        path: "/gioi-thieu-du-an/tao-moi",
        element: <NewProjectPost />,
      },
      {
        path: "/gioi-thieu-du-an/chinh-sua/:slug",
        element: <EditProjectPost />,
      },
      {
        path: "/tin-tuc",
        element: <Posts />,
      },
      {
        path: "/tin-tuc/tao-moi",
        element: <NewPost />,
      },
      {
        path: "/tin-tuc/chinh-sua/:slug",
        element: <EditPost />,
      },
      {
        path: "/danh-sach-lien-he",
        element: <Contacts />,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
    ],
  };
};

export default MainRoutes;
