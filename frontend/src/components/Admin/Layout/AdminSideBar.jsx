import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSideBar = ({ active }) => {
  const sidebarItems = [
    {
      id: 1,
      icon: <RxDashboard size={24} />,
      label: "Dashboard",
      to: "/admin/dashboard",
    },
    {
      id: 2,
      icon: <FiShoppingBag size={24} />,
      label: "All Orders",
      to: "/admin-orders",
    },
    {
      id: 3,
      icon: <GrWorkshop size={24} />,
      label: "All Sellers",
      to: "/admin-sellers",
    },
    {
      id: 4,
      icon: <HiOutlineUserGroup size={24} />,
      label: "All Users",
      to: "/admin-users",
    },
    {
      id: 5,
      icon: <BsHandbag size={24} />,
      label: "All Products",
      to: "/admin-products",
    },
    {
      id: 6,
      icon: <MdOutlineLocalOffer size={24} />,
      label: "All Events",
      to: "/admin-events",
    },
    {
      id: 7,
      icon: <CiMoneyBill size={24} />,
      label: "Withdraw Request",
      to: "/admin-withdraw-request",
    },
  ];

  return (
    <div className="w-full h-[90vh] bg-gradient-to-b from-[#ff7e29] to-[#ff9a4d] shadow-lg overflow-y-auto sticky top-0 left-0 rounded-[20px] m-10">
      <div className="flex flex-col gap-2 py-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`flex items-center gap-3 px-6 py-3 mx-3 rounded-xl transition-all duration-300
              ${
                active === item.id
                  ? "bg-white text-[#ff7e29] shadow-md"
                  : "text-white hover:bg-white/10 hover:pl-8"
              }`}
          >
            <span
              className={`transition-all duration-300 ${
                active === item.id ? "text-[#ff7e29]" : "text-white"
              }`}
            >
              {item.icon}
            </span>
            <h5
              className={`hidden 800px:block text-[16px] font-medium ${
                active === item.id ? "text-[#ff7e29]" : "text-white"
              }`}
            >
              {item.label}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
