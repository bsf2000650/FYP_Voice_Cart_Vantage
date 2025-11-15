import React from "react";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { TbAddressBook } from "react-icons/tb";

const ProfileMobNavbar = ({ active, setActive, logoutHandler }) => {
  return (
    <div className="fixed bottom-0 left-0 w-[90%] mx-auto bg-[#ff7f29] rounded-[50px] flex justify-around items-center h-12 lg:hidden z-50 ml-4">
      {/* Profile */}
      <button
        onClick={() => setActive(1)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 1 ? "bg-white" : ""
        }`}
      >
        <RxPerson size={20} color={active === 1 ? "#ff7e29" : "#fff"} />
      </button>

      {/* Orders */}
      <button
        onClick={() => setActive(2)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 2 ? "bg-white" : ""
        }`}
      >
        <HiOutlineShoppingBag
          size={20}
          color={active === 2 ? "#ff7e29" : "#fff"}
        />
      </button>

      {/* Refunds */}
      <button
        onClick={() => setActive(3)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 3 ? "bg-white" : ""
        }`}
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#ff7e29" : "#fff"}
        />
      </button>

      {/* Inbox */}
      <button
        onClick={() => setActive(4)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 4 ? "bg-white" : ""
        }`}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#ff7e29" : "#fff"} />
      </button>

      {/* Track Order */}
      <button
        onClick={() => setActive(5)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 5 ? "bg-white" : ""
        }`}
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 5 ? "#ff7e29" : "#fff"}
        />
      </button>

      {/* Address */}
      <button
        onClick={() => setActive(7)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          active === 7 ? "bg-white" : ""
        }`}
      >
        <TbAddressBook size={20} color={active === 7 ? "#ff7e29" : "#fff"} />
      </button>

      {/* Logout */}
      <button
        onClick={logoutHandler}
        className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 bg-transparent"
      >
        <AiOutlineLogin size={20} color="#fff" />
      </button>
    </div>
  );
};

export default ProfileMobNavbar;
