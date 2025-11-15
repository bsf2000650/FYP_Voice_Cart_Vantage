import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopCreateEvents = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar for desktop */}
      <div className="hidden 800px:block w-[25%]">
        <DashboardSideBar active={6} />
      </div>

      {/* Main content */}
      <div className="w-full 800px:w-[70%] flex justify-center">
        <CreateEvent />
      </div>

      {/* Mobile Navbar */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopCreateEvents;
