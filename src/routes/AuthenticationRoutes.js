import MinimalLayout from "../layout/MinimalLayout";
import Login from "~/pages/Login";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
