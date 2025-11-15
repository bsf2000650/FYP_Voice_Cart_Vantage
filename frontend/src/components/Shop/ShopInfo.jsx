import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { FiMapPin, FiPhone, FiBox, FiStar, FiCalendar } from "react-icons/fi";
import "./ShopInfo.css";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
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

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="
            w-[90%] 
            max-w-[550px] 
            mx-auto
            p-6 
            bg-[#ff7e29] 
            rounded-[40px] 
            shadow-xl 
            border border-[#ffb97c]
            transition-all 
            duration-300 
            hover:shadow-2xl
          "
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center">
            <div
              className="
                w-[150px] 
                h-[150px] 
                rounded-full 
                overflow-hidden 
                border-4 
                border-white 
                shadow-lg 
                mb-4
              "
            >
              <img
                src={data.avatar?.url}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-[24px] font-bold text-white">{data.name}</h2>

            <p className="text-[14px] text-white mt-2 px-5 opacity-90">
              {data.description || "No description provided."}
            </p>
          </div>

          {/* Details Section */}
          <div className="mt-6 space-y-4 text-white">
            <div className="flex items-center gap-3">
              <FiMapPin size={20} />
              <span className="font-medium">{data.address || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone size={20} />
              <span className="font-medium">{data.phoneNumber || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiBox size={20} />
              <span className="font-medium">
                {products ? products.length : 0} Products
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FiStar size={20} />
              <span className="font-medium">
                {averageRating.toFixed(1)}/5 Ratings
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar size={20} />
              <span className="font-medium">
                Joined: {data?.createdAt?.slice(0, 10)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {isOwner && (
            <div className="mt-8 flex flex-col gap-4">
              <Link to="/settings">
                <button
                  className="
                    w-full 
                    py-2.5 
                    bg-white 
                    text-[#ff7e29] 
                    rounded-[50px] 
                    font-semibold 
                    shadow-md 
                    hover:shadow-lg 
                    transition
                  "
                >
                  Edit Shop
                </button>
              </Link>

              <button
                className="
                  w-full 
                  py-2.5 
                  bg-white 
                  text-[#ff7e29] 
                  rounded-[50px] 
                  font-semibold 
                  shadow-md 
                  hover:shadow-lg 
                  transition
                "
                onClick={logoutHandler}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
