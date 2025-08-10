import React from "react";
import DashboardHeading from "../../../components/common/DashboardHeading";

const CustomerOrderHistory = () => {
  // Static sample order data
  const orders = [
    {
      id: "ORD-001",
      date: "2025-07-15",
      items: 3,
      total: "$120",
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2025-07-20",
      items: 1,
      total: "$40",
      status: "Pending",
    },
    {
      id: "ORD-003",
      date: "2025-07-25",
      items: 2,
      total: "$85",
      status: "Shipped",
    },
    {
      id: "ORD-004",
      date: "2025-07-29",
      items: 4,
      total: "$200",
      status: "Cancelled",
    },
  ];

  return (
    <>
      <DashboardHeading title={`Order History`} />
      <div className="bg-base-200 shadow-xl  shadow-primary/10 rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary text-base-100">
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Order ID
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">Date</th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Items
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Total
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {order.id}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {order.date}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {order.items}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {order.total}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerOrderHistory;
