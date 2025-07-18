import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../layouts/ErrorPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import AddProductPage from "../pages/AddProductPage";
import PrivateRoute from "./PrivateRoute";
import AllProductsPage from "../pages/AllProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import MyProductPage from "../pages/MyProductPage";
import CartPage from "../pages/CartPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import CategoriesPage from "../pages/CategoriesPage";
import SingleCategoryPage from "../pages/SingleCategoryPage";

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
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:category",
        element: (
          <PrivateRoute>
            <SingleCategoryPage />
          </PrivateRoute>
        ),
      },

      {
        path: "/allProduct",
        element: (
          <PrivateRoute>
            <AllProductsPage />
          </PrivateRoute>
        ),
      },

      {
        path: "/myProduct",
        element: (
          <PrivateRoute>
            <MyProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProductPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
