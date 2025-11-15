import React from "react";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopMobNavbar from "./ShopMobNavbar";

const ShopWithDrawMoneyPage = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar for desktop */}
      <div className="hidden 800px:block w-[25%]">
        <DashboardSideBar active={7} />
      </div>

      {/* Main content */}
      <div className="w-full 800px:w-[70%] flex justify-center">
        <WithdrawMoney />
      </div>

      {/* Mobile Navbar */}
      <div className="block 800px:hidden">
        <ShopMobNavbar />
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
