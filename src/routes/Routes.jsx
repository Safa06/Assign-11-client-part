import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProductDetails from "../pages/ProductDetails/ProductDetails"
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminAllProducts from "../pages/Dashboard/Admin/AdminAllProducts";
import AdminAllOrders from "../pages/Dashboard/Admin/AdminAllOrders";
import MainLayout from "../layouts/MainLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import AllProducts from "../components/Home/AllProductsPage";
import BookingForm from "../pages/BookingForm/BookingForm";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import AdminRoute from "./AdminRoute";
import UpdateProduct from "../pages/Dashboard/Admin/UpdateProduct";
//import AddPlant from "../pages/Dashboard/Seller/AddPlant";

//import Profile from "../pages/Dashboard/Common/Profile";
//import Statistics from "../pages/Dashboard/Common/Statistics";

//import MyInventory from "../pages/Dashboard/Seller/MyInventory";
//import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";

//import SellerRequests from "../pages/Dashboard/Admin/SellerRequests";
//import SellerRoute from "./SellerRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/all-products",
    element: <AllProducts></AllProducts>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
          <AdminRoute>
            <AdminAllProducts></AdminAllProducts>
            </AdminRoute>
            </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
            <PrivateRoute>
            <AdminRoute>
              <AdminAllOrders />
            </AdminRoute>
            </PrivateRoute>
            ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      //   {
      //     index: true,
      //     element: (
      //       <PrivateRoute>
      //         <Statistics />
      //       </PrivateRoute>
      //     ),
      //   },
      // {
      //   path: "add-plant",
      //   element: (
      //     <PrivateRoute>
      //       <SellerRoute>
      //         <AddPlant />
      //       </SellerRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "my-inventory",
      //   element: (
      //     <PrivateRoute>
      //       <SellerRoute>
      //         <MyInventory />
      //       </SellerRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "seller-requests",
      //   element: (
      //     <PrivateRoute>
      //       <AdminRoute>
      //         <SellerRequests />
      //       </AdminRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "profile",
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "my-orders",
      //   element: (
      //     <PrivateRoute>
      //       <MyOrders />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "manage-orders",
      //   element: (
      //     <PrivateRoute>
      //       <SellerRoute>
      //         <ManageOrders />
      //       </SellerRoute>
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "/booking/:id",
    element: (
      <PrivateRoute>
        <BookingForm></BookingForm>
      </PrivateRoute>
    ),
  },
]);
