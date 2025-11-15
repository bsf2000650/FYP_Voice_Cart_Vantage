import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllOrders from "../../components/Shop/AllOrders";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopAllOrders = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="flex justify-between w-full">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden 800px:block w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>

        {/* Main Content */}
        <div className="w-full flex justify-center">
          <AllOrders />
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopAllOrders;
