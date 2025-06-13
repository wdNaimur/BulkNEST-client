import React, { use } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import { Rating } from "react-simple-star-rating";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ProductTable = ({ product }) => {
  console.log(product);
  return (
    <tr>
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-20 w-20">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.productName}</div>
            <div className="text-sm opacity-50">{product.productBrand}</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap text-center">
        <h2 className="text-lg font-bold mb-1">{product.name}</h2>
        <div className="text-sm opacity-60 mb-1">{product.category}</div>
        <p className="text-xs uppercase font-medium tracking-wide text-base-100 px-2 py-1 rounded-box flex items-center gap-1 bg-secondary w-fit mx-auto">
          <Rating
            initialValue={product.rating}
            readonly
            size={18}
            allowFraction
            SVGstyle={{ display: "inline-block" }}
            fillColor="#FFA500"
            emptyColor="#CCCCCC"
          />
        </p>
      </td>

      {/* Quantity */}
      <td className="whitespace-nowrap text-center min-w-[80px]">
        {product.main_quantity}
      </td>

      {/* Total Price */}
      <td className="whitespace-nowrap text-center min-w-[100px]">
        {product.min_sell_quantity}
      </td>
      <td className="whitespace-nowrap text-center min-w-[100px]">
        <span className="font-semibold text-3xl text-primary">
          ${product.price} <span className="text-sm opacity-80">/ unit</span>
        </span>
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap text-center min-w-[80px]">
        <Link to={`/product/${product._id}`}>
          <button className="w-full btn btn-primary text-base-100 btn-sm">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ProductTable;
