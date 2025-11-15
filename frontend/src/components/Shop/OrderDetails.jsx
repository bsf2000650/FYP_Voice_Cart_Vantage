import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-[600]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#ff7e29] !rounded-[50px] text-white font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
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
              className="flex flex-col items-center bg-[#fff0db] shadow rounded-[15px] p-4 w-full sm:w-[48%] md:w-[32%] lg:w-[23%] min-h-[150px]"
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
            </div>
          ))}

        {!data?.cart?.length && (
          <p className="text-gray-500">No items found in this order.</p>
        )}
      </div>

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
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-[#fff0db] shadow rounded-[15px] p-4 mb-6">
        <h4 className="font-[600] text-[18px] mb-2">Order Status</h4>

        {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border h-[35px] rounded-[10px] p-2"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}

        {(data?.status === "Processing refund" ||
          data?.status === "Refund Success") && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border h-[35px] rounded-[10px] p-2"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}

        <div
          className={`${styles.button} mt-4 !bg-[#ff7e29] !rounded-[50px] text-white font-[600] !h-[45px] text-[18px] w-full text-center`}
          onClick={
            data?.status !== "Processing refund"
              ? orderUpdateHandler
              : refundOrderUpdateHandler
          }
        >
          Update Status
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
