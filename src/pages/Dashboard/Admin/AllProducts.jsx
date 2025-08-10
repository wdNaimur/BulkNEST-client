import React from "react";

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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">Product ID</th>
              <th className="py-3 px-4 border-b">Product Name</th>
              <th className="py-3 px-4 border-b">Seller</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Stock</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{product.id}</td>
                <td className="py-3 px-4 border-b">{product.name}</td>
                <td className="py-3 px-4 border-b">{product.seller}</td>
                <td className="py-3 px-4 border-b">{product.price}</td>
                <td className="py-3 px-4 border-b">{product.stock}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[product.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                  {product.status === "Pending Approval" && (
                    <button className="text-green-600 hover:underline">
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
