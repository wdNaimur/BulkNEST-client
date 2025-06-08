import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const OrderTable = ({ order, allOrder, setAllOrder }) => {
  console.log(order);
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString("en-US");
  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

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
        fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              toast.success("Order deleted successfully!");
              const remaining = allOrder.filter((item) => item._id !== id);
              setAllOrder(remaining);
            }
          });
      }
    });
  };

  return (
    <tr>
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
            <div className="font-bold">{order.productName}</div>
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
          data-tooltip-content="Delete Order"
        >
          <MdDeleteOutline />
        </button>
        <Tooltip id="order-tooltip" />
      </td>
    </tr>
  );
};

export default OrderTable;
