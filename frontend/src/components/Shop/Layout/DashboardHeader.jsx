import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="mt-4 mb-4 flex justify-end px-6">
      <div className="bg-[#ff7e29] shadow flex items-center space-x-4 py-2 px-4 rounded-[50px]">
        <Link to="/dashboard/cupouns" className="hidden 800px:block">
          <AiOutlineGift
            color="#fff"
            size={25}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/dashboard-events" className="hidden 800px:block">
          <MdOutlineLocalOffer
            color="#fff"
            size={25}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/dashboard-products" className="hidden 800px:block">
          <FiShoppingBag
            color="#fff"
            size={25}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/dashboard-orders" className="hidden 800px:block">
          <FiPackage
            color="#fff"
            size={25}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/dashboard-messages" className="hidden 800px:block">
          <BiMessageSquareDetail
            color="#fff"
            size={25}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
        <Link to={`/shop/${seller._id}`}>
          <img
            src={`${seller.avatar?.url}`}
            alt="Profile"
            className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white hover:scale-105 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
