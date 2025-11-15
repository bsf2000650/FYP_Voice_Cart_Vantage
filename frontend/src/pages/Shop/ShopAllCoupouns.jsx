import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllCoupons from "../../components/Shop/AllCoupons";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopAllCoupons = () => {
  return (
    <div className="flex w-full">
      <div className="hidden 800px:block w-[25%]">
        <DashboardSideBar active={9} />
      </div>

      <div className="w-full 800px:w-[70%] flex justify-center">
        <AllCoupons />
      </div>

      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopAllCoupons;
