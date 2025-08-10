import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomerOverview = () => {
  // Static sample data for now
  const ordersData = [
    { month: "Jan", orders: 5 },
    { month: "Feb", orders: 3 },
    { month: "Mar", orders: 8 },
    { month: "Apr", orders: 4 },
    { month: "May", orders: 7 },
    { month: "Jun", orders: 6 },
    { month: "Jul", orders: 9 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Customer Overview</h1>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">42</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Spending</p>
          <h2 className="text-2xl font-bold mt-2">$1,250</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Wishlist Items</p>
          <h2 className="text-2xl font-bold mt-2">15</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Pending Deliveries</p>
          <h2 className="text-2xl font-bold mt-2">3</h2>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow rounded-xl p-5">
        <p className="text-gray-500 mb-4">Monthly Orders</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#F97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
