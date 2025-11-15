import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopDashboardPage = () => {
  return (
    <div>
      {/* MOBILE NAVBAR (VISIBLE ONLY BELOW 800px) */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>

      <div className="flex items-start justify-between w-full">
        {/* Sidebar (Hidden on mobile) */}
        <div className="hidden 800px:block w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>

        {/* Dashboard Content */}
        <DashboardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
