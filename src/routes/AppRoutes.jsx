import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../layouts/ErrorPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import AddProductPage from "../pages/AddProductPage";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";
import AllProductsPage from "../pages/AllProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Loader from "../UI/Loader";

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
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/allProduct",
        hydrateFallbackElement: <Loader />,
        loader: () => axios(`${import.meta.env.VITE_API_URL}/products`),
        element: (
          <PrivateRoute>
            <AllProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        hydrateFallbackElement: <Loader />,
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/product/${params.id}`),
        element: (
          <PrivateRoute>
            <ProductDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
