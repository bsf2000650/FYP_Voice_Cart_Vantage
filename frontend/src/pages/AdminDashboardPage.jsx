import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";
import AdminMobNavbar from "./AdminMobNavbar";

const AdminDashboardPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        <div className="hidden 800px:block w-[330px]">
          <AdminSideBar active={1} />
        </div>
        <AdminDashboardMain />
      </div>

      <div className="block 800px:hidden">
        <AdminMobNavbar />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
