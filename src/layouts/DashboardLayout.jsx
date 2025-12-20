// import { Outlet } from "react-router";
// import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

// const DashboardLayout = () => {
//   return (
//     <div className="relative min-h-screen md:flex bg-white">
//       {/* Left Side: Sidebar Component */}
//       <Sidebar />
//       {/* Right Side: Dashboard Dynamic Content */}
//       <div className="flex-1  md:ml-64">
//         <div className="p-5">
//           {/* Outlet for dynamic contents */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { NavLink, Outlet } from "react-router";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-5">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-3 flex flex-col gap-4">
            <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
            <NavLink to="/dashboard/all-products">All Products</NavLink>
            <NavLink to="/dashboard/my-orders">All Orders</NavLink>
          </nav>
      </aside>

      {/* Dynamic content */}
      <main className="md:col-span-4 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
    
  );
};

export default DashboardLayout;
