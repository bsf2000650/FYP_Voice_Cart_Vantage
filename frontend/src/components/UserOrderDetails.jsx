import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <BsFillBagFill size={35} color="crimson" />
        <h1 className="pl-3 text-[28px] font-[600]">Order Details</h1>
      </div>

      {/* Order Info */}
      <div className="flex flex-col 800px:flex-row justify-between bg-[#fff0db] shadow rounded-[15px] p-4 mb-6">
        <h5 className="text-gray-600 mb-2 800px:mb-0">
          <span className="font-[600]">Order ID:</span> #
          {data?._id?.slice(0, 8)}
        </h5>
        <h5 className="text-gray-600">
          <span className="font-[600]">Placed on:</span>{" "}
          {data?.createdAt?.slice(0, 10)}
        </h5>
      </div>

      {/* Order Items */}
      <div className="flex flex-wrap gap-4 mb-6">
        {data &&
          data?.cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#fff0db] shadow rounded-[15px] p-4 w-full sm:w-[48%] md:w-[32%] lg:w-[23%] min-h-[200px] transition-transform transform hover:scale-[1.02]"
            >
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="w-[80px] h-[80px] rounded-[10px] object-cover mb-3"
              />
              <div className="flex flex-col items-start w-full flex-1">
                <h5 className="text-[18px] font-[600]">{item.name}</h5>
                <h6 className="text-gray-500 text-[14px] mt-1">
                  US${item.discountPrice} x {item.qty}
                </h6>
              </div>
              {!item.isReviewed && data?.status === "Delivered" && (
                <div
                  className={`${styles.button} text-white mt-3 w-full text-center`}
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  Write a Review
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Review Popup */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-[500px] bg-[#fff0db] shadow rounded-[15px] p-5 relative">
            <RxCross1
              size={28}
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-4 right-4"
            />
            <h2 className="text-[24px] font-[600] text-center mb-4">
              Give a Review
            </h2>

            <div className="flex items-center mb-4">
              <img
                src={selectedItem?.images[0]?.url}
                alt={selectedItem?.name}
                className="w-[70px] h-[70px] rounded-[10px] object-cover"
              />
              <div className="ml-3">
                <h4 className="font-[600] text-[18px]">{selectedItem?.name}</h4>
                <h5 className="text-gray-500 text-[14px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h5>
              </div>
            </div>

            {/* Ratings */}
            <h5 className="font-[500] mb-2">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    size={25}
                    color="rgb(246,186,0)"
                    className="cursor-pointer mr-1"
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    size={25}
                    color="rgb(246,186,0)"
                    className="cursor-pointer mr-1"
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            {/* Comment Box */}
            <div className="mb-4">
              <label className="block font-[500] text-[16px] mb-2">
                Write a Comment{" "}
                <span className="text-gray-400 text-[14px]">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full h-[100px] border border-gray-300 rounded-[10px] p-2 outline-none resize-none"
              />
            </div>

            <div
              className={`${styles.button} text-white w-full text-center py-2 rounded-[10px]`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit Review
            </div>
          </div>
        </div>
      )}

      {/* Total Price */}
      <div className="bg-[#fff0db] shadow rounded-[15px] p-4 text-right mb-6">
        <h5 className="text-[18px] font-[500]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>

      {/* Shipping & Payment */}
      <div className="flex flex-col 800px:flex-row gap-6 mb-6">
        <div className="bg-[#fff0db] shadow rounded-[15px] p-4 flex-1">
          <h4 className="font-[600] text-[18px] mb-2">Shipping Address</h4>
          <p className="text-gray-600">
            {data?.shippingAddress.address1} {data?.shippingAddress.address2}
          </p>
          <p className="text-gray-600">
            {data?.shippingAddress.city}, {data?.shippingAddress.country}
          </p>
          <p className="text-gray-600">{data?.user?.phoneNumber}</p>
        </div>
        <div className="bg-[#fff0db] shadow rounded-[15px] p-4 flex-1">
          <h4 className="font-[600] text-[18px] mb-2">Payment Info</h4>
          <p className="text-gray-600">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </p>
          {data?.status === "Delivered" && (
            <div
              className={`${styles.button} text-white mt-3 w-full text-center py-2 rounded-[10px]`}
              onClick={refundHandler}
            >
              Request Refund
            </div>
          )}
        </div>
      </div>

      {/* Message Button */}
      <Link to="/">
        <div
          className={`${styles.button} text-white text-center py-2 px-6 !rounded-[50px] ml-auto`}
        >
          Send Message
        </div>
      </Link>
    </div>
  );
};

export default UserOrderDetails;
