import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopAllProducts = () => {
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="hidden 800px:block w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
        <div className="block 800px:hidden">
          <ShopMobNavbar />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
