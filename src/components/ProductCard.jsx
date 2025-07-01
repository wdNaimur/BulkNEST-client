import React, { useContext, useRef } from "react";
import { Link } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { motion, useInView } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AuthContext } from "../AuthContexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ProductCard = ({ product, setProducts }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    brand,
    description,
    image,
    main_quantity,
    min_sell_quantity,
    name,
    price,
    rating,
    _id,
  } = product;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Delete product?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      background: "rgba(17, 24, 39, 0.4)",
      color: "#f9fafb",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#0d9488  ",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "blur-popup",
      },
      didOpen: () => {
        document.querySelector(".blur-popup").style.backdropFilter =
          "blur(8px)";
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/product/${id}?email=${user.email}`
          );
          if (res.status === 200 && res.data.deletedCount > 0) {
            toast.success("Product deleted successfully");
            setProducts((prev) => prev.filter((product) => product._id !== id));
          } else {
            toast.error("Failed to delete product. Please try again.");
          }
        } catch (error) {
          console.error("Error while deleting product:", error);
          toast.error("An error occurred while deleting the product.");
        }
      }
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full group"
    >
      <div className="rounded-box shadow-sm group-hover:shadow-xl w-full bg-base-100 text-secondary flex flex-col mx-auto h-full group-hover:scale-[1.02] group-hover:-translate-y-1.5 transition-all">
        {/* Image */}
        <div className="relative">
          <div className="rounded-t-box xl:h-64 h-56 w-full mb-4 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <span className="absolute bottom-2 left-3">
            <p className="text-xs uppercase font-medium tracking-wide text-base-100 px-2 py-1 rounded-box flex items-center gap-1 bg-base-200">
              <Rating
                initialValue={rating}
                readonly
                size={18}
                allowFraction
                SVGstyle={{ display: "inline-block" }}
                fillColor="#FFA500"
                emptyColor="#CCCCCC"
              />
            </p>
          </span>

          <Link
            data-tooltip-id="edit"
            to={`/updateProduct/${_id}`}
            className="btn btn-circle bg-base-200 border-none opacity-60 hover:opacity-100 shadow-sm transition-all hover:shadow-lg hover:scale-105 absolute top-2 right-2 text-lg text-secondary"
          >
            <MdEdit />
          </Link>
          <ReactTooltip id="edit" place="top-start" content="Edit Product" />

          <button
            type="button"
            data-tooltip-id="delete"
            onClick={() => handleDeleteProduct(_id)}
            className="btn btn-circle bg-base-200 border-none opacity-60 hover:opacity-100 shadow-sm transition-all hover:shadow-lg hover:scale-105 absolute top-2 left-2 text-lg text-secondary"
          >
            <MdDelete />
          </button>
          <ReactTooltip
            id="delete"
            place="top-start"
            content="Delete Product"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col justify-between h-full p-4 pt-0">
          <div className="flex-1">
            <div className="mb-2">
              <div className="flex gap-3 items-center">
                <h3 className="text-lg font-bold mb-1">
                  {name} | {brand}
                </h3>
              </div>
              <p className="text-sm opacity-80 mb-2">
                {description?.length > 60
                  ? description.slice(0, 55).split(" ").slice(0, -1).join(" ") +
                    "..."
                  : description}
              </p>
            </div>

            <div className="text-sm space-y-1 mb-4 grid grid-cols-2 divide-x-2 divide-dashed divide-primary/40">
              <p className="w-full text-center">
                <span className="font-semibold text-3xl text-primary">
                  ${price} <span className="text-sm opacity-80">/ unit</span>
                </span>
              </p>
              <div className="justify-self-center">
                <p>
                  <span className="font-semibold">In Stock:</span>{" "}
                  {main_quantity}
                </p>
                <p>
                  <span className="font-semibold">Min Order:</span>{" "}
                  {min_sell_quantity}
                </p>
              </div>
            </div>
          </div>

          <Link
            to={`/product/${_id}`}
            className="w-full btn btn-secondary text-base-100 inline-block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
