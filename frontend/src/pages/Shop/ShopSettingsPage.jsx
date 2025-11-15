import React from "react";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopSettingsPage = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col 800px:flex-row">
      {/* Sidebar - Desktop only */}
      <div className="hidden 800px:flex w-[80px] 800px:w-[300px]">
        <DashboardSideBar active={11} />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full 800px:w-[calc(100%-330px)] flex justify-center">
        <ShopSettings />
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="block 800px:hidden fixed bottom-0 w-full z-50">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
