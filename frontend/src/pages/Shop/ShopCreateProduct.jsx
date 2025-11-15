import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopCreateProduct = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar for desktop */}
      <div className="hidden 800px:block w-[25%]">
        <DashboardSideBar active={4} />
      </div>

      {/* Main content */}
      <div className="w-full 800px:w-[70%] flex justify-center">
        <CreateProduct />
      </div>

      {/* Mobile Navbar */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopCreateProduct;
