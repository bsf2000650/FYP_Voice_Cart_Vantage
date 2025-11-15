import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminMobNavbar from "./AdminMobNavbar";
import AllWithdraw from "../components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        {/* Sidebar - hidden on mobile/tablet */}
        <div className="hidden 800px:block w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <AllWithdraw />
      </div>

      {/* Mobile/Tablet Navbar */}
      <div className="block 800px:hidden">
        <AdminMobNavbar />
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
