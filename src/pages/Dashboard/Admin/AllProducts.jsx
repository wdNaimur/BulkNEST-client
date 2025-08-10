import React from "react";
import DashboardHeading from "../../../components/common/DashboardHeading";

const AllProducts = () => {
  // Sample static product data
  const products = [
    {
      id: "PRD001",
      name: "Organic Rice",
      seller: "FreshFarms",
      price: "$20",
      stock: 120,
      status: "Active",
    },
    {
      id: "PRD002",
      name: "Dried Mango",
      seller: "TropicalDelights",
      price: "$15",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "PRD003",
      name: "Honey",
      seller: "BeePure",
      price: "$25",
      stock: 50,
      status: "Pending Approval",
    },
    {
      id: "PRD004",
      name: "Spices Mix",
      seller: "FlavorHouse",
      price: "$10",
      stock: 200,
      status: "Active",
    },
  ];

  // Badge colors based on product status
  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    "Out of Stock": "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6">
      <DashboardHeading title={`All Products`}></DashboardHeading>

      <div className="bg-base-200 shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary text-base-100">
              <th className="py-3 px-4 border-b border-b-secondary/10 min-w-28">
                Product ID
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10 min-w-36">
                Product Name
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Seller
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Price
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Stock
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Status
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-base-200">
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {product.id}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {product.name}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {product.seller}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {product.price}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {product.stock}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10 min-w-44">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[product.status] ||
                      "bg-base-100 text-secondary/80"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10 space-x-2 min-w-52">
                  <button className="text-primary hover:underline">Edit</button>
                  <button className="text-primary hover:underline">
                    Delete
                  </button>
                  {product.status === "Pending Approval" && (
                    <button className="text-primary hover:underline">
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
