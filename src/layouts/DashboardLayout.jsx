import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";


const DashboardLayout = () => {
  //const { user, loading } = useAuth();
  // console.log(user);
  // console.log(loading);

  return (
    <div className="flex min-h-screen">
      <Sidebar />


      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      
    </div>
  );
};

export default DashboardLayout;
