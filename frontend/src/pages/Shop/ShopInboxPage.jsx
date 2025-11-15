import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopInboxPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="flex items-start justify-between w-full">
        {/* Sidebar */}
        <div className="hidden 800px:block w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={8} />
        </div>

        {/* Messages */}
        <div className="w-full flex justify-center">
          <DashboardMessages />
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopInboxPage;
