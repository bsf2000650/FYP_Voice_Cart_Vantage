import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const tabs = [
    { id: 1, icon: <RxPerson size={20} />, label: "Profile" },
    { id: 2, icon: <HiOutlineShoppingBag size={20} />, label: "Orders" },
    { id: 3, icon: <HiOutlineReceiptRefund size={20} />, label: "Refunds" },
    {
      id: 4,
      icon: <AiOutlineMessage size={20} />,
      label: "Inbox",
      onClick: () => navigate("/inbox"),
    },
    { id: 5, icon: <MdOutlineTrackChanges size={20} />, label: "Track Order" },
    { id: 6, icon: <RiLockPasswordLine size={20} />, label: "Change Password" },
    { id: 7, icon: <TbAddressBook size={20} />, label: "Address" },
  ];

  if (user && user.role === "Admin") {
    tabs.push({
      id: 8,
      icon: <MdOutlineAdminPanelSettings size={20} />,
      label: "Admin Dashboard",
      link: "/admin/dashboard",
    });
  }

  tabs.push({
    id: 9,
    icon: <AiOutlineLogin size={20} />,
    label: "Log out",
    onClick: logoutHandler,
  });

  return (
    <div className="w-full bg-[#ff7f29] shadow-sm rounded-[10px] p-4 pt-8">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const tabContent = (
          <div
            onClick={() => {
              setActive(tab.id);
              if (tab.onClick) tab.onClick();
            }}
            className={`flex items-center cursor-pointer w-full mb-4 py-2 px-4 rounded-[50px] transition-all duration-200
              ${
                isActive
                  ? "bg-white text-[#ff7f29]"
                  : "text-white hover:bg-white hover:text-[#ff7f29]"
              }`}
          >
            {React.cloneElement(tab.icon, {
              color: isActive ? "#ff7f29" : "white",
            })}
            <span className="pl-3 800px:block hidden">{tab.label}</span>
          </div>
        );

        return tab.link ? (
          <Link key={tab.id} to={tab.link}>
            {tabContent}
          </Link>
        ) : (
          <div key={tab.id}>{tabContent}</div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
