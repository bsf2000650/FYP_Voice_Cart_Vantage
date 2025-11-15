import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineCamera,
  AiOutlineShop,
  AiOutlineInfoCircle,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { server } from "../../server";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipcode] = useState(seller?.zipCode || "");

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch(() => toast.error("Error updating avatar"));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/shop/update-seller-info`,
        { name, address, zipCode, phoneNumber, description },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch(() => toast.error("Error updating shop info"));
  };

  const inputClass =
    "w-[95%] mb-4 pl-12 py-2 border border-gray-300 rounded-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7f29] focus:border-[#ff7f29] relative";

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#fff0db] py-10 mt-[20px] mr-[20px] rounded-[20px] m-[10px] sm:m-3 pb-[80px] sm:pb-2">
      {/* Avatar */}
      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src={avatar ? avatar : seller?.avatar?.url}
            alt="Shop Avatar"
            className="w-[200px] h-[200px] rounded-full cursor-pointer border-4 border-[#ff7f29]"
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={updateHandler}
        className="flex flex-col items-center w-full 800px:w-[80%] mt-8 relative pl-[10px] sm:pl-0"
      >
        {/* Shop Name */}
        <div className="w-full relative">
          <AiOutlineShop className="absolute left-4 top-[12px] text-[#ff7f29] text-xl" />
          <input
            type="text"
            placeholder="Shop Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Shop Description */}
        <div className="w-full relative">
          <AiOutlineInfoCircle className="absolute left-4 top-[12px] text-[#ff7f29] text-xl" />
          <input
            type="text"
            placeholder="Shop Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Shop Address */}
        <div className="w-full relative">
          <AiOutlineHome className="absolute left-4 top-[12px] text-[#ff7f29] text-xl" />
          <input
            type="text"
            placeholder="Shop Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="w-full relative">
          <AiOutlinePhone className="absolute left-4 top-[12px] text-[#ff7f29] text-xl" />
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Zip Code */}
        <div className="w-full relative">
          <AiOutlineMail className="absolute left-4 top-[12px] text-[#ff7f29] text-xl" />
          <input
            type="number"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex flex-col items-center mt-6">
          <input
            type="submit"
            value="Update Shop"
            className="w-[95%] px-6 py-2 rounded-[50px] cursor-pointer bg-[#ff7f29] text-white border-none text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default ShopSettings;
