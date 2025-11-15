import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminMobNavbar from "./AdminMobNavbar";
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        <div className="hidden 800px:block w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <AllUsers />
      </div>

      <div className="block 800px:hidden">
        <AdminMobNavbar />
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
