import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import "./Header.css";
import useSpeechToText from "../../hooks/useSpeechToText/useSpeechToText";
import ShoppingBagLogo from "../../../src/images/shoppingBag.png";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setSearchTerm(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
    );
    stopListening();
  };

  const handleSearchChange = () => {
    setSearchTerm(searchTerm.toLowerCase());
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().replace(".", ""))
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) setActive(true);
    else setActive(false);
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
          {/* Logo - hidden on mobile */}
          <div className="hidden 800px:flex logoDiv">
            <Link to="/">
              <img className="shopping_img" src={ShoppingBagLogo} alt="logo" />
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <div className="voiceSearchBtn">
              <textarea
                cols="30"
                required
                rows="2"
                type="text"
                name="productName"
                value={
                  isListening
                    ? searchTerm +
                      (transcript.length
                        ? (searchTerm.length ? " " : "") + transcript
                        : searchTerm)
                    : searchTerm
                }
                disabled={isListening}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm searchBar"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="voiceBtnsSearch" onClick={startStopListening}>
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button className="voiceBtnsSearch" onClick={handleSearchChange}>
                <IoSearch />
              </button>
            </div>

            {/* Search Results */}
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => (
                  <a key={index} href={`/product/${i._id}`}>
                    <div className="w-full flex items-start py-3">
                      <img
                        src={`${i.images[0]?.url}`}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Icons Section */}
          <div className="bg-[#ff7e29] rounded-[20px] flex items-center justify-between gap-2 p-1">
            {/* Wishlist */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="white" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-black text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {/* Cart */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="white" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-black text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* Profile */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full mb-2"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="white" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart + Wishlist popups */}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* --------- Navbar Section (Full Width) --------- */}
      <div
        className={`${
          active === true ? "shadow-sm top-0 left-0 z-10" : ""
        } transition rounded-[50px] ml-3 mr-3 hidden 800px:flex items-center w-[98%] bg-[#ff7e29]`}
      >
        <div className={`${styles.section} w-full flex justify-center`}>
          <Navbar active={activeHeading} />
        </div>
      </div>

      {/* --------- Mobile Header (without logo) --------- */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } 800px:flex justify-center items-center gap-8 mx-[10px] my-[10px] w-[95%] h-[50px] bg-[#ff7e29] rounded-[40px] 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
              color="white"
            />
          </div>
          <div>{/* Logo hidden on mobile */}</div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="white" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>

        {/* Sidebar Menu (mobile) */}
        {open && (
          <div className="fixed bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[92%] bg-[#daedea] h-[97vh] top-0 left-0 z-10 overflow-y-scroll m-2.5 rounded-[25px] ml-[15px]">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3"
                      color="#ff7e29"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                  color="#ff7e29"
                />
              </div>

              {/* Search Bar (mobile) */}
              <div className="my-4 w-[92%] max-w-xl mx-auto relative">
  <div className="voiceSearchBtn relative flex items-start">
    <textarea
      cols="30"
      required
      rows="2"
      type="text"
      name="productName"
      value={
        isListening
          ? searchTerm +
            (transcript.length
              ? (searchTerm.length ? " " : "") + transcript
              : searchTerm)
          : searchTerm
      }
      disabled={isListening}
      className="mt-2 appearance-none block w-full pr-20 pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm searchBar resize-none"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
      <button
        className="voiceBtns stop p-2"
        onClick={startStopListening}
      >
        {isListening ? (
          <FaMicrophoneSlash className="text-xl text-white" />
        ) : (
          <FaMicrophone className="text-xl text-white" />
        )}
      </button>
      <button
        className="voiceBtnsSearch stop p-2"
        onClick={handleSearchChange}
      >
        <IoSearch className="text-xl text-white" />
      </button>
    </div>
  </div>

  {searchData && (
    <div className="searchResults absolute bg-white z-10 shadow w-full left-0 p-3 max-h-64 overflow-y-auto rounded-md">
      {searchData.map((i, index) => (
        <a key={index} href={`/product/${i._id}`}>
          <div className="w-full flex items-start py-3">
            <img
              src={`${i.images[0]?.url}`}
              alt=""
              className="w-[40px] h-[40px] mr-3 object-cover rounded"
            />
            <h1 className="text-sm sm:text-base">{i.name}</h1>
          </div>
        </a>
      ))}
    </div>
  )}
</div>


              {/* Navbar */}
              <Navbar active={activeHeading} />

              {/* Auth/Profile */}
              <div className="flex w-full justify-center mt-0">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#ff7e29] text-white px-4 py-2 rounded-[25px] mr-2 hover:bg-[#e26a1f] transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/sign-up"
                      className="bg-[#ff7e29] text-white px-4 py-2 rounded-[25px] hover:bg-[#e26a1f] transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
