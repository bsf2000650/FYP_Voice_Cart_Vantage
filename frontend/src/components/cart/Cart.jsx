import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-4 right-4 w-[80%] 800px:w-[25%] h-[95%] bg-white flex flex-col justify-between shadow-xl rounded-[25px] overflow-y-scroll z-10">
        {/* Close Button (Always top-right) */}
        <div className="absolute top-3 right-3 z-20">
          <RxCross1
            size={28}
            className="cursor-pointer text-[#ff7e29] hover:scale-110 transition-transform"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <IoBagHandleOutline size={40} className="text-[#ff7e29] mb-3" />
            <h5 className="text-gray-600 font-medium text-lg">
              Cart is empty!
            </h5>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={`${styles.noramlFlex} p-5 mt-2`}>
              <IoBagHandleOutline size={25} className="text-[#ff7e29]" />
              <h5 className="pl-2 text-[20px] font-[600] text-[#333]">
                {cart && cart.length} Items
              </h5>
            </div>

            {/* Cart Items */}
            <div className="w-full border-t mt-2">
              {cart &&
                cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>

            {/* Checkout */}
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#ff7f29] rounded-[50px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600] ">
                    Checkout Now (${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div
      className="relative border-b p-4 rounded-[15px] mx-3 my-3 bg-[#fff0db] shadow-lg
      hover:shadow-[0_10px_25px_rgba(255,126,41,0.3)] transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Top-right actions */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <RxCross1
          className="cursor-pointer text-[#ff7e29] hover:scale-110 transition-transform"
          onClick={() => removeFromCartHandler(data)}
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
        <h4 className="font-[400] text-[15px] text-[#00000082] mt-1">
          ${data.discountPrice} x {value}
        </h4>
        <h4 className="font-[600] text-[17px] pt-2 text-[#d02222] font-Roboto">
          US${totalPrice}
        </h4>

        {/* Quantity controls moved below price */}
        <div className="flex items-center gap-3 mt-3">
          <div
            className="bg-[#ff7e29] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#fff" />
          </div>
          <span className="font-[500] text-[16px]">{value}</span>
          <div
            className="bg-[#ff7e29] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={16} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
