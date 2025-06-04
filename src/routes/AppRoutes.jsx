import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../layouts/ErrorPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signIn",
        element: <SignInPage />,
      },
      {
        path: "/signUp",
        element: <SignUpPage />,
      },
    ],
  },
]);
export default router;
