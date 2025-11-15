import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import axios from "axios";
import { server } from "../../../server";

const DashboardSideBar = ({ active }) => {
  const tabs = [
    {
      id: 1,
      name: "Dashboard",
      icon: <RxDashboard size={30} />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "All Orders",
      icon: <FiShoppingBag size={30} />,
      path: "/dashboard-orders",
    },
    {
      id: 3,
      name: "All Products",
      icon: <FiPackage size={30} />,
      path: "/dashboard-products",
    },
    {
      id: 4,
      name: "Create Product",
      icon: <AiOutlineFolderAdd size={30} />,
      path: "/dashboard-create-product",
    },
    {
      id: 5,
      name: "All Events",
      icon: <MdOutlineLocalOffer size={30} />,
      path: "/dashboard-events",
    },
    {
      id: 6,
      name: "Create Event",
      icon: <VscNewFile size={30} />,
      path: "/dashboard-create-event",
    },
    {
      id: 7,
      name: "Withdraw Money",
      icon: <CiMoneyBill size={30} />,
      path: "/dashboard-withdraw-money",
    },
    {
      id: 8,
      name: "Shop Inbox",
      icon: <BiMessageSquareDetail size={30} />,
      path: "/dashboard-messages",
    },
    {
      id: 9,
      name: "Discount Codes",
      icon: <AiOutlineGift size={30} />,
      path: "/dashboard-coupouns",
    },
    {
      id: 10,
      name: "Refunds",
      icon: <HiOutlineReceiptRefund size={30} />,
      path: "/dashboard-refunds",
    },
    {
      id: 11,
      name: "Settings",
      icon: <CiSettings size={30} />,
      path: "/settings",
    },
    {
      id: 12,
      name: "Logout",
      icon: <FiLogOut size={30} />,
      path: "/logout",
    },
  ];

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/shop/logout`, { withCredentials: true });
      window.location.replace("/shop-login"); // prevents back button access
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-[95vh] bg-[#ff7e29] rounded-[20px] shadow-sm sticky top-0 left-0 z-10 m-4 p-2 overflow-y-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <div key={tab.id} className="w-full flex items-center p-3 mb-2">
            {tab.name === "Logout" ? (
              <div
                onClick={logoutHandler}
                className={`
              w-full flex items-center cursor-pointer transition-all
              ${
                isActive
                  ? "bg-white text-[#ff7e29] rounded-[50px] px-4 py-2"
                  : "text-white hover:bg-white hover:text-[#ff7e29] rounded-[50px] px-4 py-2"
              }
            `}
              >
                {React.cloneElement(tab.icon, {
                  color: isActive ? "#ff7e29" : undefined,
                })}

                <h5 className="hidden 800px:block pl-3 text-[18px] font-[400]">
                  {tab.name}
                </h5>
              </div>
            ) : (
              <Link
                to={tab.path}
                className={`
              w-full flex items-center transition-all
              ${
                isActive
                  ? "bg-white text-[#ff7e29] rounded-[50px] px-4 py-2"
                  : "text-white hover:bg-white hover:text-[#ff7e29] rounded-[50px] px-4 py-2"
              }
            `}
              >
                {React.cloneElement(tab.icon, {
                  color: isActive ? "#ff7e29" : undefined,
                })}

                <h5 className="hidden 800px:block pl-3 text-[18px] font-[400]">
                  {tab.name}
                </h5>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSideBar;
