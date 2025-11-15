import React, { useEffect } from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminMobNavbar from "./AdminMobNavbar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor",
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
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        {/* Sidebar - hidden on mobile/tablet */}
        <div className="hidden 800px:block w-[330px]">
          <AdminSideBar active={2} />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full min-h-[45vh] pt-5 flex justify-center ml-[10px] sm:ml-[50px] mt-[10px] sm:mt-[40px] mb-[60px] sm:pb-0 mr-[14px] bg-[#fff0db] rounded-[20px]">
          <div className="w-[97%] flex justify-center">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navbar */}
      <div className="block 800px:hidden">
        <AdminMobNavbar />
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
