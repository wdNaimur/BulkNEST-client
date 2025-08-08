import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import HomePage from "../pages/Home/HomePage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AddProductPage from "../pages/Dashboard/Seller/AddProductPage";
import CategoriesPage from "../pages/Products/CategoriesPage";
import SingleCategoryPage from "../pages/Products/SingleCategoryPage";
import AllProductsPage from "../pages/Products/AllProductsPage";
import MyProductPage from "../pages/Dashboard/Seller/MyProductPage";
import CartPage from "../pages/Cart/CartPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import UpdateProductPage from "../pages/Dashboard/Seller/UpdateProductPage";
import PrivateRoute from "./PrivateRoute";

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
        element: <SingleCategoryPage />,
      },

      {
        path: "/allProduct",
        element: <AllProductsPage />,
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
        element: <ProductDetailsPage />,
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
