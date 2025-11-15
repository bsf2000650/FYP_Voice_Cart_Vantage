import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { AiOutlineHome } from "react-icons/ai";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            dispatch(loadUser());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => toast.error(error));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full p-[10px]">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#ff7f29]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              {/* Name & Email */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] relative mb-4">
                  <AiOutlineUser className="absolute top-[12px] left-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%] relative mb-4">
                  <AiOutlineMail className="absolute top-[12px] left-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone & Password */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] relative mb-4">
                  <AiOutlinePhone className="absolute top-[12px] left-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%] relative mb-4">
                  <AiOutlineLock className="absolute top-[12px] left-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Centered Update Button */}
              <div className="flex justify-center">
                <input
                  type="submit"
                  value="Update"
                  className="w-[250px] h-[40px] rounded-[50px] cursor-pointer bg-[#ff7e29] text-white border-none text-center"
                />
              </div>
            </form>
          </div>
        </>
      )}

      {/* Orders */}
      {active === 2 && <AllOrders />}
      {active === 3 && <AllRefundOrders />}
      {active === 5 && <TrackOrder />}
      {active === 6 && <ChangePassword />}
      {active === 7 && <Address />}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-4 py-4">
      <h1 className="text-[25px] text-center font-[600] text-[#000000ba] mb-6">
        Change Password
      </h1>

      <form onSubmit={passwordChangeHandler} className="w-full">
        <div className="w-full 800px:flex block gap-4 mb-4">
          <div className="w-[100%] 800px:w-[50%] relative mb-4">
            <input
              type="password"
              placeholder="Old Password"
              className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] relative mb-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full 800px:flex block gap-4 mb-4">
          <div className="w-[100%] 800px:w-[50%] relative mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 transition-all focus:border-[#ff7e29] hover:border-[#ff7e29]"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <input
            type="submit"
            value="Update"
            className="w-[250px] h-[40px] rounded-[50px] cursor-pointer bg-[#ff7e29] text-white border-none text-center"
          />
        </div>
      </form>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full relative">
      {/* Add Address Popup */}
      {open && (
        <div className="fixed inset-0 bg-[#0000004b] z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-[600px] bg-[#fff0db] rounded-[20px] shadow relative overflow-y-auto p-4">
            <div className="w-full flex justify-end mb-4">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins mb-6">
              Add New Address
            </h1>

            <form onSubmit={handleSubmit} className="w-full">
              {/* Country & City */}
              <div className="w-full 800px:flex gap-4 mb-4">
                <div className="w-full relative mb-4">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                  >
                    <option value="">Choose your country</option>
                    {Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full relative mb-4">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                  >
                    <option value="">Choose your city</option>
                    {State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address 1 & Address 2 */}
              <div className="w-full 800px:flex gap-4 mb-4">
                <div className="w-full relative mb-4">
                  <input
                    type="text"
                    placeholder="Address 1"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-full relative mb-4">
                  <input
                    type="text"
                    placeholder="Address 2"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              {/* Zip Code & Address Type */}
              <div className="w-full 800px:flex gap-4 mb-4">
                <div className="w-full relative mb-4">
                  <input
                    type="number"
                    placeholder="Zip Code"
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="w-full relative mb-4">
                  <select
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="w-[95%] pl-10 h-[40px] rounded-[50px] border border-gray-300 focus:border-[#ff7e29] hover:border-[#ff7e29]"
                  >
                    <option value="">Choose Address Type</option>
                    {addressTypeData.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <input
                  type="submit"
                  value="Add Address"
                  className="w-[250px] h-[40px] rounded-[50px] cursor-pointer bg-[#ff7e29] text-white border-none text-center"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header: My Addresses & Add New */}
      <div className="flex flex-col 800px:flex-row w-full items-center justify-between gap-2 800px:gap-0 mb-4">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-[50px]`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>

      {/* Address List */}
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white rounded-[20px] shadow p-4 flex flex-col 800px:flex-row 800px:items-center justify-between mb-5 transition-transform transform hover:scale-[1.02]"
            key={index}
          >
            {/* Address Type */}
            <div className="flex items-center mb-2 800px:mb-0">
              <h5 className="font-[600] text-[#333] text-sm 800px:text-base">
                {item.addressType}
              </h5>
            </div>

            {/* Address Info */}
            <div className="flex flex-col 800px:flex-row 800px:items-center w-full 800px:w-auto mb-2 800px:mb-0">
              <h6 className="text-gray-600 text-[12px] 800px:text-sm mb-1 800px:mb-0">
                {item.address1} {item.address2}
              </h6>
              <span className="hidden 800px:inline-block mx-2 text-gray-400">
                |
              </span>
              <h6 className="text-gray-600 text-[12px] 800px:text-sm">
                {user && user.phoneNumber}
              </h6>
            </div>

            {/* Delete Icon */}
            <div className="flex justify-end 800px:justify-start mt-2 800px:mt-0">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {/* No Addresses */}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
