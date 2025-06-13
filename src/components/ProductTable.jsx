import React from "react";
import { Link } from "react-router";
import { Rating } from "react-simple-star-rating";
import "react-tooltip/dist/react-tooltip.css";

const ProductTable = ({ product }) => {
  return (
    <tr>
      {/* Product  */}
      <td className="whitespace-nowrap">
        <div className="flex gap-4">
          <div className="avatar">
            <div className="mask mask-squircle h-20 w-20">
              <img
                src={product?.image}
                alt={product?.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="rounded">
            <h2 className="font-bold text-lg text-secondary">
              {product?.name}
            </h2>
            <p className="text-sm text-primary">{product?.brand}</p>
          </div>
        </div>
      </td>
      {/* Price  */}
      <td className="whitespace-nowrap text-center min-w-[100px]">
        <span className="font-semibold text-3xl text-primary">
          ${product.price} <span className="text-sm opacity-80">/ unit</span>
        </span>
      </td>
      {/* rating  */}
      <td className="whitespace-nowrap text-center">
        <p className="text-xs uppercase font-medium tracking-wide text-base-100 px-2 py-1 rounded-box flex items-center gap-1 bg-base-200 w-fit mx-auto">
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

      {/* min Quantity  */}
      <td className="whitespace-nowrap text-center min-w-[100px]">
        {product.min_sell_quantity}
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
