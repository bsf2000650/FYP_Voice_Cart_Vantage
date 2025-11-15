import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineFlag,
  AiOutlineKey,
} from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (!address1 || !address2 || !zipCode || !country || !city) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = { address1, address2, zipCode, country, city };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid = cart.filter((item) => item.shopId === shopId);
        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      } else {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex gap-6">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPrice={discountPrice}
          />
        </div>
      </div>

      <div className="w-[90%] 800px:w-[70%] mt-10 flex justify-center">
        <button
          onClick={paymentSubmit}
          className="w-full 800px:w-[280px] bg-[#ff7e29] p-3 rounded-[25px] text-white font-[600] hover:scale-105 transition-transform"
        >
          Go to Payment
        </button>
      </div>
    </div>
  );
};

// ---------------- Shipping Info Component ----------------

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const inputClass =
    "rounded-[50px] p-3 pl-12 w-full focus:outline-none hover:border hover:border-[#ff7e29] transition-all duration-300";

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff0db] rounded-[20px] p-6 shadow-md">
      <h5 className="text-[20px] font-[600] mb-6 border-b pb-2 border-[#ff7e29]">
        Shipping Address
      </h5>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <AiOutlineUser className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
          <input
            type="text"
            value={user?.name}
            placeholder="Full Name"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <AiOutlineMail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
          <input
            type="email"
            value={user?.email}
            placeholder="Email Address"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <AiOutlinePhone className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
            <input
              type="number"
              value={user?.phoneNumber}
              placeholder="Phone Number"
              className={inputClass}
            />
          </div>

          <div className="relative w-full">
            <AiOutlineKey className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
            <input
              type="number"
              value={zipCode}
              placeholder="Zip Code"
              onChange={(e) => setZipCode(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <AiOutlineFlag className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              <option value="">Choose Country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full">
            <FaCity className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            >
              <option value="">Choose City</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <AiOutlineHome className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
          <input
            type="text"
            value={address1}
            placeholder="Address 1"
            onChange={(e) => setAddress1(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <AiOutlineHome className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
          <input
            type="text"
            value={address2}
            placeholder="Address 2"
            onChange={(e) => setAddress2(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

// ---------------- Cart Data Component ----------------

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPrice,
}) => {
  const inputClass =
    "rounded-[50px] p-3 pl-12 w-full focus:outline-none hover:border hover:border-[#ff7e29] transition-all duration-300";

  return (
    <div className="w-full bg-[#fff0db] rounded-[20px] p-6 shadow-md">
      <h5 className="text-[18px] font-[600] mb-4 border-b pb-2 border-[#ff7e29]">
        Order Summary
      </h5>
      <div className="flex justify-between mt-2">
        <span className="text-[#555]">Subtotal:</span>
        <span className="font-[600]">${subTotalPrice}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[#555]">Shipping:</span>
        <span className="font-[600]">${shipping.toFixed(2)}</span>
      </div>
      {discountPrice && (
        <div className="flex justify-between mt-2 text-[#d02222] font-[600]">
          <span>Discount:</span>
          <span>- ${discountPrice}</span>
        </div>
      )}
      <div className="flex justify-between mt-4 text-[18px] font-[600] border-t pt-2">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div className="relative">
          <AiOutlineKey className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ff7e29] text-xl" />
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={inputClass}
          />
        </div>
        <input
          type="submit"
          value="Apply Coupon"
          className="bg-[#ff7e29] text-white rounded-[50px] p-3 cursor-pointer hover:bg-[#e06a1f] transition-colors"
        />
      </form>
    </div>
  );
};

export default Checkout;
