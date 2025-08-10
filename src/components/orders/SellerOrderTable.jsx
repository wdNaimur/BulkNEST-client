import React from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SellerOrderTable = ({ order, setSellerOrders, index }) => {
  console.log(order);
  const axiosSecure = useAxiosSecure();
  // Handle status update (e.g., Pending → Shipped → Delivered)
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await axiosSecure.patch(`/orders/status/${order._id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Order marked as ${newStatus}`);
        setSellerOrders((prev) =>
          prev.map((o) =>
            o._id === order._id ? { ...o, status: newStatus } : o
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Handle order cancellation
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await axiosSecure.delete(`/orders/${order._id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Order cancelled");
        setSellerOrders((prev) => prev.filter((o) => o._id !== order._id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <td>{index + 1}</td>
      {/* Buyer Name */}
      <td className="min-w-52 table-cell">
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            {order?.buyerDetails?.buyerName || "Unknown Buyer"}
          </span>
          <span className="opacity-80">
            {order?.buyerDetails?.buyerEmail || "Unknown Buyer"}
          </span>
        </div>
      </td>
      {/* contact info */}
      <td className="min-w-52 table-cell">
        <div className="flex flex-col gap-1 justify-center items-center">
          <span className="font-medium">
            {order?.buyerDetails?.buyerAddress || "Unknown Buyer"}
          </span>
          <span className="opacity-80">
            {order?.buyerDetails?.buyerPhone || "Unknown Buyer"}
          </span>
        </div>
      </td>

      {/* Product Name */}
      <td className="text-center min-w-52">{order.productName}</td>

      {/* Order Date */}
      <td className="text-center">
        {new Date(order.date).toLocaleDateString()}
      </td>

      {/* Quantity */}
      <td className="text-center">{order.quantity}</td>

      {/* Total Price */}
      <td className="text-center">৳{order.totalPrice}</td>

      {/* Status */}
      <td className="text-center">
        <span
          className={`badge ${
            order.status === "Pending"
              ? "badge-warning"
              : order.status === "Shipped"
              ? "badge-info"
              : "badge-success"
          }`}
        >
          {order.status ? order.status : "pending"}
        </span>
      </td>

      {/* Actions */}
      <td className="text-center space-x-2">
        {order.status === "Pending" && (
          <button
            className="btn btn-xs btn-info"
            onClick={() => handleStatusChange("Shipped")}
          >
            Mark Shipped
          </button>
        )}
        {order.status === "Shipped" && (
          <button
            className="btn btn-xs btn-success"
            onClick={() => handleStatusChange("Delivered")}
          >
            Mark Delivered
          </button>
        )}
        <button className="btn btn-xs btn-error" onClick={handleCancel}>
          Cancel
        </button>
      </td>
    </motion.tr>
  );
};

export default SellerOrderTable;
