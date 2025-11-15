import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import styles from "../../../styles/styles";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setClick(wishlist?.some((i) => i._id === data._id));
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(false);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart?.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      dispatch(addTocart({ ...data, qty: 1 }));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div
      className="w-full h-[400px] bg-[#fff2e3] rounded-lg shadow-sm p-3 cursor-pointer text-black
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col gap-2"
    >
      {/* Icon container separated from image */}
      <div className="flex justify-end gap-2 p-1 border border-orange-500 rounded-full bg-white shadow-sm">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer"
            onClick={() => addToWishlistHandler(data)}
            color="black"
            title="Add to wishlist"
          />
        )}

        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer"
          onClick={() => addToCartHandler(data._id)}
          color="black"
          title="Add to cart"
        />
      </div>

      {/* Product image */}
      <a
        href={`${
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <img
          src={data.images?.[0]?.url}
          alt=""
          className="w-full h-[170px] object-contain rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </a>

      {/* Shop Name */}
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`${styles.shop_name} text-orange-500 font-madimi mt-2`}>
          {data.shop.name}
        </h5>
      </Link>

      {/* Product Name */}
      <Link
        to={`${
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <h4 className="pb-3 font-[500] text-black font-madimi mt-1">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>

        {/* Ratings */}
        <div className="flex justify-center text-black my-2">
          <Ratings rating={data?.ratings} />
        </div>

        {/* Price and sold */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex gap-2">
            <h5 className={`${styles.productDiscountPrice} text-black`}>
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className={`${styles.price} text-black`}>
              {data.originalPrice ? data.originalPrice + " $" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-black">
            {data?.sold_out} sold
          </span>
        </div>
      </Link>

      {/* Quick view card if open */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
