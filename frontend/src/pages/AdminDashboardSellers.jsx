import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminMobNavbar from "./AdminMobNavbar"; // Make sure this exists
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        {/* Sidebar - hidden on mobile/tablet */}
        <div className="hidden 800px:block w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers />
      </div>

      {/* Mobile/Tablet Navbar */}
      <div className="block 800px:hidden">
        <AdminMobNavbar />
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
