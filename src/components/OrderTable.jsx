import React, { use } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../AuthContexts/AuthContext";
import { motion } from "framer-motion";

const OrderTable = ({ order, allOrder, setAllOrder, index }) => {
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString("en-US");
  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const delay = index * 0.1;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      background: "rgba(61, 64, 91, 0.4)",
      color: "#f4f1ee",
      showCancelButton: true,
      confirmButtonColor: "#3d405b",
      cancelButtonColor: "#0d9488",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "blur-popup",
      },
      didOpen: () => {
        document.querySelector(".blur-popup").style.backdropFilter =
          "blur(8px)";
        document.querySelector(".blur-popup").style.webkitBackdropFilter =
          "blur(8px)";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/orders/${id}?email=${user?.email}`)
          .then((data) => {
            if (data.data.deletedCount) {
              const remaining = allOrder.filter((item) => item._id !== id);
              setAllOrder(remaining);
              toast.success("Order history deleted successfully!");
            } else {
              toast.error("Failed to delete Order history!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)", scale: 0.9 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {/* Order ID */}
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12 min-w-12">
              <img
                src={order.productImage}
                alt={order.productName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <div className="font-bold min-w-60 text-wrap">
              {order.productName}
            </div>
            <div className="text-sm opacity-50">{order.productBrand}</div>
          </div>
        </div>
      </td>

      {/* Date & Time */}
      <td className="whitespace-nowrap text-center min-w-[120px]">
        <div>{formattedDate}</div>
        <div className="text-sm opacity-60">{formattedTime}</div>
      </td>

      {/* Quantity */}
      <td className="whitespace-nowrap text-center min-w-[80px]">
        {order.quantity}
      </td>

      {/* Total Price */}
      <td className="whitespace-nowrap text-center min-w-[100px]">
        {order.totalPrice} $
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap text-center min-w-[80px]">
        <button
          onClick={() => handleDelete(order._id)}
          className="text-xl text-secondary px-2 hover:scale-105 cursor-pointer"
          data-tooltip-id="order-tooltip"
          data-tooltip-content="Delete Order history"
        >
          <MdDeleteOutline />
        </button>
        <Tooltip id="order-tooltip" place="top-start" />
      </td>
    </motion.tr>
  );
};

export default OrderTable;
