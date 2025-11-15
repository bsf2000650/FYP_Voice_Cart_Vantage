import React, { useState, useEffect } from "react";
import { AiOutlineGift, AiOutlineFolderAdd } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const ShopMobNavbar = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 420);
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tabs for small screens (7 icons)
  const smallTabs = [
    { id: 1, icon: <RxDashboard size={24} />, path: "/dashboard" },
    { id: 2, icon: <FiShoppingBag size={24} />, path: "/dashboard-orders" },
    { id: 3, icon: <FiPackage size={24} />, path: "/dashboard-products" },
    {
      id: 4,
      icon: <AiOutlineFolderAdd size={24} />,
      path: "/dashboard-create-product",
    },
    {
      id: 5,
      icon: <MdOutlineLocalOffer size={24} />,
      path: "/dashboard-events",
    },
    {
      id: 6,
      icon: <BiMessageSquareDetail size={24} />,
      path: "/dashboard-messages",
    },
    { id: 7, icon: <AiOutlineGift size={24} />, path: "/dashboard-coupouns" },
  ];

  // Tabs for larger screens (>425px) (all 11 icons)
  const largeTabs = [
    { id: 1, icon: <RxDashboard size={24} />, path: "/dashboard" },
    { id: 2, icon: <FiShoppingBag size={24} />, path: "/dashboard-orders" },
    { id: 3, icon: <FiPackage size={24} />, path: "/dashboard-products" },
    {
      id: 4,
      icon: <AiOutlineFolderAdd size={24} />,
      path: "/dashboard-create-product",
    },
    {
      id: 5,
      icon: <MdOutlineLocalOffer size={24} />,
      path: "/dashboard-events",
    },
    { id: 6, icon: <VscNewFile size={24} />, path: "/dashboard-create-event" },
    {
      id: 7,
      icon: <CiMoneyBill size={24} />,
      path: "/dashboard-withdraw-money",
    },
    {
      id: 8,
      icon: <BiMessageSquareDetail size={24} />,
      path: "/dashboard-messages",
    },
    { id: 9, icon: <AiOutlineGift size={24} />, path: "/dashboard-coupouns" },
    {
      id: 10,
      icon: <HiOutlineReceiptRefund size={24} />,
      path: "/dashboard-refunds",
    },
    { id: 11, icon: <CiSettings size={24} />, path: "/settings" },
  ];

  const tabs = isSmallScreen ? smallTabs : largeTabs;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-[#ff7e29] rounded-[50px] shadow-lg flex items-center justify-around px-3 py-2 w-[95%] max-w-[500px] z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300
              ${
                isActive
                  ? "bg-white text-[#ff7e29]"
                  : "text-white hover:bg-white hover:text-[#ff7e29]"
              }
            `}
          >
            {React.cloneElement(tab.icon, {
              color: isActive ? "#ff7e29" : "#fff",
            })}
          </Link>
        );
      })}
    </div>
  );
};

export default ShopMobNavbar;
