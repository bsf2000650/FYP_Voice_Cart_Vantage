import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-4 right-4 w-[80%] 800px:w-[25%] h-[95%] bg-white flex flex-col justify-between shadow-xl rounded-[25px] overflow-y-scroll z-10">
        {/* Close Button (Always top-right) */}
        <div className="absolute top-3 right-3 z-20">
          <RxCross1
            size={28}
            className="cursor-pointer text-[#ff7e29] hover:scale-110 transition-transform"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <AiOutlineHeart size={40} className="text-[#ff7e29] mb-3" />
            <h5 className="text-gray-600 font-medium text-lg">
              Wishlist is empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              {/* Header */}
              <div className={`${styles.noramlFlex} p-5 mt-2`}>
                <AiOutlineHeart size={25} className="text-[#ff7e29]" />
                <h5 className="pl-2 text-[20px] font-[600] text-[#333]">
                  {wishlist && wishlist.length} Items
                </h5>
              </div>

              {/* Wishlist Items */}
              <div className="w-full border-t mt-2">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div
      className="relative border-b p-4 rounded-[15px] mx-3 my-3 bg-[#fff0db] shadow-lg 
      hover:shadow-[0_10px_25px_rgba(255,126,41,0.3)] transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Top-right actions */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <RxCross1
          className="cursor-pointer text-[#ff7e29] hover:scale-110 transition-transform"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <BsCartPlus
          size={22}
          className="cursor-pointer text-[#ff7e29] hover:scale-110 transition-transform"
          title="Add to cart"
          onClick={() => addToCartHandler(data)}
        />
      </div>

      {/* Product info vertically aligned */}
      <div className="flex flex-col items-center text-center mt-6">
        <img
          src={`${data?.images[0]?.url}`}
          alt={data.name}
          className="w-[100px] h-[100px] object-cover rounded-[10px] mb-3"
        />
        <h1 className="text-[16px] font-[500] text-[#333]">{data.name}</h1>
        <h4 className="font-[600] pt-2 text-[17px] text-[#d02222] font-Roboto">
          US${totalPrice}
        </h4>
      </div>
    </div>
  );
};

export default Wishlist;
