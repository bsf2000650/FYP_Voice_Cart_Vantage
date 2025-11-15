import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import ShoppingBagLogo from "../../../src/images/shoppingBag.png";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 text-gray-800">
      {/* Footer main section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-12 px-6 py-16">
        {/* Logo & description */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <img src={ShoppingBagLogo} alt="" className="w-24 mb-3" />
          <p className="text-gray-700">
            The home and elements needed to create beautiful products.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <AiFillFacebook
              size={25}
              className="cursor-pointer hover:text-blue-600 transition-colors"
            />
            <AiOutlineTwitter
              size={25}
              className="cursor-pointer hover:text-blue-400 transition-colors"
            />
            <AiFillInstagram
              size={25}
              className="cursor-pointer hover:text-pink-500 transition-colors"
            />
            <AiFillYoutube
              size={25}
              className="cursor-pointer hover:text-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Company Links */}
        <ul className="flex flex-col space-y-2">
          <h1 className="mb-2 font-semibold text-lg">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-600 hover:text-orange-500 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shop Links */}
        <ul className="flex flex-col space-y-2">
          <h1 className="mb-2 font-semibold text-lg">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-600 hover:text-orange-500 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Support Links */}
        <ul className="flex flex-col space-y-2">
          <h1 className="mb-2 font-semibold text-lg">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-600 hover:text-orange-500 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer bottom section */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 px-6 sm:px-12 py-6">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          © 2025 Hamart Shop. All Rights Reserved.
        </p>
        <img
          src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
          alt="Payment Methods"
          className="h-8"
        />
      </div>
    </div>
  );
};

export default Footer;
