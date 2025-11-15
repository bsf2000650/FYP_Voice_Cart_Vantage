import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import "./ProductDetails.css";
import { CgDetailsMore } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    setClick(wishlist && wishlist.find((i) => i._id === data?._id));
  }, [data, wishlist]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => count > 1 && setCount(count - 1);

  const removeFromWishlistHandler = (data) => {
    setClick(false);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) toast.error("Item already in cart!");
    else if (data.stock < 1) toast.error("Product stock limited!");
    else {
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = (totalRatings / totalReviewsLength || 0).toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId: user._id,
          sellerId: data.shop._id,
        })
        .then((res) => navigate(`/inbox?${res.data.conversation._id}`))
        .catch((err) => toast.error(err.response.data.message));
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-[#d4d4d4] py-8">
      {data && (
        <div className="w-[90%] 800px:w-[80%] mx-auto">
          <div className="flex flex-col 800px:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full 800px:w-1/2 flex flex-col items-center bg-[#fff2e3] rounded-[20px] shadow-lg p-3">
              <img
                src={data.images[select]?.url}
                alt={data.name}
                className="w-[90%] rounded-xl mb-4 shadow-md"
              />
              <div className="flex gap-3 overflow-x-auto overflow-y-hidden">
                {data.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt="thumb"
                    className={`h-[70px] w-[70px] object-cover rounded-lg cursor-pointer border-2 ${
                      select === idx ? "border-[#ff7e29]" : "border-transparent"
                    }`}
                    onClick={() => setSelect(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full 800px:w-1/2 flex flex-col items-center bg-[#fff2e3] rounded-[20px] shadow-lg p-3">
              <div>
                <h1 className="text-2xl 800px:text-3xl font-bold text-[#333]">
                  {data.name}
                </h1>
                <p className="text-gray-600 mt-2">{data.description}</p>

                <div className="flex items-center gap-4 mt-4">
                  <h4 className="text-xl font-semibold text-[#ff7e29]">
                    ${data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <h3 className="text-gray-400 line-through">
                      ${data.originalPrice}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="px-4 py-2 bg-[#ff7e29] text-white font-bold hover:opacity-80 transition"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-gray-100 font-semibold">
                      {count}
                    </span>
                    <button
                      className="px-4 py-2 bg-[#ff7e29] text-white font-bold hover:opacity-80 transition"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist */}
                  <div className="cursor-pointer">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        color="red"
                        onClick={() => removeFromWishlistHandler(data)}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="mt-4 w-full bg-[#ff7e29] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center gap-2"
                >
                  Add to cart <AiOutlineShoppingCart />
                </button>
              </div>

              {/* Shop Info */}
              <div className="flex items-center justify-between mt-6 bg-[#fff3dd] p-4 rounded-xl shadow-sm">
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={data.shop.avatar?.url}
                      alt={data.shop.name}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{data.shop.name}</h3>
                      <p className="text-sm text-gray-600">
                        ({averageRating}/5) Ratings
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={handleMessageSubmit}
                  className="bg-[#6443d1] text-white px-4 py-2 rounded-xl hover:opacity-90 transition flex items-center gap-2"
                >
                  Send Message <AiOutlineMessage />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  const tabs = [
    { title: "Product Details", icon: CgDetailsMore },
    { title: "Product Reviews", icon: GoCodeReview },
    { title: "Seller Information", icon: FaEye },
  ];

  return (
    <div className="mt-8 p-2 800px:px-10 bg-[#fff2e3] rounded-3xl shadow-lg">
      <div className="flex justify-between gap-6 border-b p-3 rounded-[50px] bg-[#ff7e29] text-white">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          return (
            <div
              key={idx}
              className="relative group cursor-pointer flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto"
              onClick={() => setActive(idx + 1)}
            >
              {/* Text - hidden on mobile */}
              <span className="hidden sm:inline transition-opacity duration-300 group-hover:opacity-0 font-semibold text-lg text-white">
                {tab.title}
              </span>

              {/* Icon - visible on mobile, appears on hover on desktop */}
              <span className="flex items-center justify-center sm:absolute sm:inset-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                <Icon size={20} />
              </span>

              {/* Underline */}
              <span
                className={`absolute bottom-0 left-0 h-[3px] bg-white rounded-full transition-all duration-300 ${
                  active === idx + 1 ? "w-full" : "group-hover:w-full w-0"
                }`}
              ></span>
            </div>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        {active === 1 && (
          <p className="text-gray-700 leading-7">{data.description}</p>
        )}

        {active === 2 && (
          <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto">
            {data.reviews.length ? (
              data.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start bg-[#fff3dd] p-3 rounded-xl shadow-sm"
                >
                  <img
                    src={review.user.avatar?.url}
                    alt={review.user.name}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <Ratings rating={review.rating} />
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="text-center text-gray-500">
                No Reviews for this product!
              </h5>
            )}
          </div>
        )}

        {active === 3 && (
          <div className="flex flex-col 800px:flex-row gap-6 mt-4 bg-[#fff3dd] p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={data.shop.avatar?.url}
                alt={data.shop.name}
                className="w-[60px] h-[60px] rounded-full"
              />
              <div>
                <h3 className="font-semibold">{data.shop.name}</h3>
                <p className="text-gray-600">{data.shop.description}</p>
                <p className="text-gray-500 text-sm">
                  Joined on: {data.shop?.createdAt?.slice(0, 10)}
                </p>
                <p className="text-gray-500 text-sm">
                  Total Products: {products.length} | Total Reviews:{" "}
                  {totalReviewsLength}
                </p>
              </div>
            </div>
            <Link to="/">
              <button className="mt-4 800px:mt-0 bg-[#ff7e29] text-white px-4 py-2 rounded-xl hover:opacity-90 transition">
                Visit Shop
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
