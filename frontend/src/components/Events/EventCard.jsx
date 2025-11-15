import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import "./EventCard.css";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-[97%] block bg-[#fff0db] rounded-[25px] p-4 m-4 eventMain ${
        active ? "unset" : "mb-12"
      } lg:flex`}
    >
      <div className="w-full lg:w-1/2 m-auto event p-2">
        <img
          src={`${data.images[0]?.url}`}
          alt={data.name}
          className="rounded-[20px] shadow-md"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle} text-[#333]`}>{data.name}</h2>
        <p className="text-gray-700 mt-2">{data.description}</p>
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-center gap-3">
            {data.originalPrice && (
              <h5 className="font-[500] text-[18px] text-[#d55b45] line-through">
                ${data.originalPrice}
              </h5>
            )}
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              ${data.discountPrice}
            </h5>
          </div>
          <span className="font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex items-center gap-4 mt-4 flex-col sm:flex-row">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-white`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-white`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
