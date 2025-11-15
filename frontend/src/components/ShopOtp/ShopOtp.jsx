import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopOtp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get Signup Data
  const { name, phoneNumber, email, address, zipCode, password, avatar } =
    location.state || {};

  console.log(email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // STEP 1 → Verify OTP
      const res = await axios.post(`${server}/shop/verify-otp`, { otp, email });
      toast.success(res.data.message);

      // STEP 2 → Create User after OTP verification
      const createRes = await axios.post(`${server}/shop/create-shop`, {
        name,
        phoneNumber,
        email,
        address,
        zipCode,
        password,
        avatar,
      });

      toast.success(createRes.data.message);

      setOtp("");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#ff7e29] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-4 text-3xl font-extrabold text-white">
          Verify Your OTP 🔒
        </h2>
        <p className="mt-1 text-sm text-white opacity-90">
          Enter the OTP sent to your email
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-2 sm:px-0">
        <div className="bg-[#fff0db] py-8 px-6 sm:px-8 rounded-[30px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-orange-100 transform transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div>
              <label
                htmlFor="otp"
                className="block text-[15px] font-semibold text-gray-700 mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                name="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="block w-full pl-4 pr-4 py-2 bg-[#fffaf5] rounded-[50px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-[45px] flex justify-center items-center text-sm font-semibold text-white bg-[#ff7e29] rounded-[50px] shadow-md hover:shadow-lg hover:bg-[#ff944d] transition-all duration-300"
              >
                Verify OTP
              </button>
            </div>

            {/* Resend / Login Link */}
            <div className="flex justify-center text-sm text-gray-700 mt-3">
              <span>Didn't receive the OTP?</span>
              <Link
                to="/resend-otp"
                className="text-[#ff7e29] pl-2 font-semibold hover:underline"
              >
                Resend
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopOtp;
