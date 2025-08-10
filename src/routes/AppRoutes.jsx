import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import HomePage from "../pages/Home/HomePage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import CategoriesPage from "../pages/Products/CategoriesPage";
import PrivateRoute from "./PrivateRoute";
import SingleCategoryPage from "../pages/Products/SingleCategoryPage";
import AllProductsPage from "../pages/Products/AllProductsPage";
import CartPage from "../pages/Cart/CartPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyProductPage from "../pages/Dashboard/Seller/MyProductPage";
import AddProductPage from "../pages/Dashboard/Seller/AddProductPage";
import UpdateProductPage from "../pages/Dashboard/Seller/UpdateProductPage";
import Overview from "../pages/Dashboard/Overview/Overview";
import ProfilePage from "../pages/Dashboard/Profile/ProfilePage";
import OrderPage from "../pages/Dashboard/Seller/OrderPage";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import ContactUs from "../pages/ContactUs/ContactUs";
import CustomerOrderHistory from "../pages/Dashboard/Customer/CustomerOrderHistory";

const router = createBrowserRouter([
  //Home Section
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signIn", element: <SignInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/categories/:category", element: <SingleCategoryPage /> },
      { path: "/allProduct", element: <AllProductsPage /> },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/contact", element: <ContactUs /> },
    ],
  },

  // Dashboard section
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order-history",
        element: (
          <PrivateRoute>
            <CustomerOrderHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
