import React from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProductCard = ({ product }) => {
  const {
    brand,
    category,
    description,
    image,
    main_quantity,
    min_sell_quantity,
    name,
    price,
    rating,
    userEmail,
    _id,
  } = product;

  return (
    <div className="rounded-box shadow-md w-full bg-base-100 text-secondary flex flex-col mx-auto h-full">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="rounded-t-box h-48 w-full object-cover mb-4"
        />

        <span className="absolute bottom-2 left-3">
          <p className="text-xs uppercase font-medium tracking-wide bg-secondary text-base-100 px-2 py-1 rounded-box">
            {category}
          </p>
        </span>
        <button className="btn btn-circle bg-primary border-none opacity-50 hover:opacity-100 shadow-sm transition-all hover:shadow-lg hover:scale-105 absolute top-2 right-2 text-lg text-white">
          <MdEdit />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between h-full p-4 pt-0">
        <div className="flex-1">
          <div className="mb-2">
            <div className="flex gap-3 items-center">
              <h2 className="text-lg font-bold mb-1">{name}</h2>
              <span className="font-poppins inline-flex items-center rounded-md bg-primary/80 px-2 py-1 text-xs font-medium text-base-100">
                {brand}
              </span>
            </div>
            <p className="text-sm opacity-80 mb-2">
              {description.length > 60
                ? description.slice(0, 50).split(" ").slice(0, -1).join(" ") +
                  "..."
                : description}
            </p>
          </div>

          <div className="text-sm space-y-1 mb-4">
            <p>
              <span className="font-semibold">Price:</span> ${price}
            </p>
            <p>
              <span className="font-semibold">In Stock:</span> {main_quantity}
            </p>
            <p>
              <span className="font-semibold">Min Order:</span>{" "}
              {min_sell_quantity}
            </p>
            <p className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span>{rating} / 5</span>
            </p>
            <p className="text-xs opacity-70 text-white">
              Added by: {userEmail}
            </p>
          </div>
        </div>

        <div>
          <Link to={`/product/${_id}`}>
            <button className="w-full btn btn-primary text-base-100">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
