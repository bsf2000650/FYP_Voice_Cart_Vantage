import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";

const AdminMobNavbar = ({ active }) => {
  const navItems = [
    { id: 1, icon: <RxDashboard size={24} />, to: "/admin/dashboard" },
    { id: 2, icon: <FiShoppingBag size={24} />, to: "/admin-orders" },
    { id: 3, icon: <GrWorkshop size={24} />, to: "/admin-sellers" },
    { id: 4, icon: <HiOutlineUserGroup size={24} />, to: "/admin-users" },
    { id: 5, icon: <BsHandbag size={24} />, to: "/admin-products" },
    { id: 6, icon: <MdOutlineLocalOffer size={24} />, to: "/admin-events" },
    { id: 7, icon: <CiMoneyBill size={24} />, to: "/admin-withdraw-request" },
  ];

  return (
    <div className="fixed bottom-3 left-3 right-3 bg-gradient-to-t from-[#ff7e29] to-[#ff9a4d] shadow-t-lg flex justify-around items-center py-2 800px:hidden rounded-[50px]">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300
            ${active === item.id ? "bg-white text-[#ff7f29]" : "text-white"}
            hover:bg-white hover:text-[#ff7f29]`}
        >
          <span>{item.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default AdminMobNavbar;
