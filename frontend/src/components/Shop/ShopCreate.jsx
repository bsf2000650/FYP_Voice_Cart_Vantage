import { React, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineCamera,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopCreate = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setAvatar(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // ✅ Disable button until all fields are filled
  const isDisabled =
    !name.trim() ||
    !phoneNumber.trim() ||
    !email.trim() ||
    !address.trim() ||
    !zipCode.trim() ||
    !password.trim() ||
    !avatar;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ STEP 1: Hit create-otp API
      const otpRes = await axios.post(`${server}/shop/create-otp`, {
        email,
      });

      toast.success(otpRes.data.message);

      // Save temp shop data in localStorage to use on OTP page
      localStorage.setItem(
        "tempShop",
        JSON.stringify({
          name,
          phoneNumber,
          email,
          address,
          zipCode,
          password,
          avatar,
        })
      );

      // Navigate to OTP page
      navigate("/shop-verify-otp", {
        state: { name, phoneNumber, email, address, zipCode, password, avatar },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#ff7e29] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-4 text-3xl font-extrabold text-white">
          Register Your Shop ✨
        </h2>
        <p className="mt-1 text-sm text-white opacity-90">
          Create your shop account
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-2 sm:px-0">
        <div className="bg-[#fff0db] py-8 px-6 sm:px-8 rounded-[30px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-orange-100 transform transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Avatar Upload */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-md border-2 border-[#ff7e29]">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AiOutlineUser className="text-gray-400" size={45} />
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 bg-[#ff7e29] p-1 rounded-full shadow-md">
                    <AiOutlineCamera size={18} color="#fff" />
                  </div>
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Shop Name
              </label>
              <div className="relative">
                <AiOutlineUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter shop name"
                  className="block w-full pl-10 pr-3 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="block w-full pl-4 pr-3 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <AiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="block w-full pl-10 pr-3 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter shop address"
                className="block w-full pl-4 pr-3 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
                className="block w-full pl-4 pr-3 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[15px] font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={visible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="block w-full pl-10 pr-10 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={22}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={22}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full h-[45px] flex justify-center items-center text-sm font-semibold text-white rounded-[50px] shadow-md transition-all duration-300
                  ${
                    isDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ff7e29] hover:bg-[#ff944d]"
                  }`}
              >
                Register Shop
              </button>
            </div>

            {/* Login */}
            <div className="flex justify-center text-sm text-gray-700 mt-3">
              <span>Already have an account?</span>
              <Link
                to="/shop-login"
                className="text-[#ff7e29] pl-2 font-semibold hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
