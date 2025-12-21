import Home from "../pages/Home/Home";
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
import OrderDetails from "../pages/Dashboard/Admin/OrderDetails";
import ManagerRoute from "./ManagerRoute";
import AddProduct from "../pages/Dashboard/Manager/AddProduct"
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts"
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders"
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import TrackOrder from "../pages/Dashboard/Customer/TrackOrder";
import Profile from "../pages/Dashboard/Common/Profile";
import ErrorLoading from "../pages/ErrorLoading"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLoading />,
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
      {
        path: "orders/details/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <OrderDetails />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: <PaymentSuccess>

        </PaymentSuccess>
      },


      // manager part
      {
        path: "add-product",
        element: (
            <ManagerRoute>
              <AddProduct />
            </ManagerRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProducts />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApprovedOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "track-order/:orderId",
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
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
