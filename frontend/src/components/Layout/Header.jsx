import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiChat, BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
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
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);

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
    console.log("Search Terms -> ", searchTerm);
    console.log("Transcript -> ", searchTerm.toLowerCase());

    setSearchTerm(searchTerm.toLowerCase());
    console.log("Term -> ", searchTerm.toLowerCase());

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().replace(".", ""))
      );
    setSearchData(filteredProducts);
    console.log(filteredProducts._id);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const handleDropDown = () => {
    setDropDownVisible(!isDropDownVisible);
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
          <div className="logoDiv">
            <Link to="/">
              <img className="shopping_img" src={ShoppingBagLogo} alt="" />
            </Link>
          </div>
          {/* search box */}
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
              >
                {searchTerm}
              </textarea>
              <button className="voiceBtnsSearch" onClick={startStopListening}>
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button className="voiceBtnsSearch" onClick={handleSearchChange}>
                <IoSearch />
              </button>
            </div>

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <a href={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </a>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(0 0 0 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="rgb(0 0 0 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-black font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
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
                    <CgProfile size={30} color="rgb(0 0 0/ 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>

          <div className={`${styles.button} bg-[rgb(248 123 39)]`}>
            <Link to={`${isSeller ? "/dashboard" : "/create-shop"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full h-[70px] pages-navbar`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between `}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft
                size={35}
                className="absolute top-3 left-2 cursor-pointer"
              />
              <button
                className={`h-[100%] w-full flex items-center pl-10 font-madimione text-lg font-[500] select-none rounded-t-md all-categories z-30 text-black`}
                onClick={handleDropDown}
              >
                All Categories
              </button>
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDownVisible}
                  isVisible={isDropDownVisible}
                />
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex} z-50`}>
            <Navbar active={activeHeading} />
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={ShoppingBagLogo}
                alt=""
                className="mt-3 cursor-pointer w-11/12 mx-auto sm:w-23 mbViewLogo"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[90%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
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
                  >
                    {searchTerm}
                  </textarea>
                  <button
                    className="voiceBtns stop"
                    onClick={startStopListening}
                  >
                    {" "}
                    {isListening ? (
                      <FaMicrophoneSlash className="btns" />
                    ) : (
                      <FaMicrophone className="btns" />
                    )}
                  </button>
                  <button
                    className="voiceBtnsSearch stop"
                    onClick={handleSearchChange}
                  >
                    <IoSearch className="btns" />
                  </button>
                </div>
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <a href={`/product/${i._id}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                src={`${i.images[0]?.url}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div
                className={`${styles.button} ml-4 !rounded-[4px] bg-[#ff7f29]`}
              >
                <Link to="/create-shop">
                  <h1 className="flex items-center text-lg">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

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
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
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
