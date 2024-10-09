import { createBrowserRouter } from "react-router-dom";
import { paths } from "../constants/paths";

import HomePage from "../pages/home";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";
import ProtectedRoute from "../components/protected-route";
import AuthRoute from "../components/auth-route";

export const router = createBrowserRouter([
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.home,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute isAdmin={true} />,
    children: [
      {
        path: paths.dashboard,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "",
    element: <AuthRoute />,
    children: [
      {
        path: paths.login,
        element: <LoginPage />,
      },
      {
        path: paths.register,
        element: <RegisterPage />,
      },
    ],
  },
]);
