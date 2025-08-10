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

const SellerOverview = () => {
  // Static sample data for now
  const staticData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 4890 },
    { month: "Jun", sales: 6390 },
    { month: "Jul", sales: 7490 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-xl shadow-primary/5 rounded-xl p-5">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">1,245</h2>
        </div>
        <div className="bg-white shadow-xl shadow-primary/5 rounded-xl p-5">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold mt-2">$12,560</h2>
        </div>
        <div className="bg-white shadow-xl shadow-primary/5 rounded-xl p-5">
          <p className="text-gray-500">New Customers</p>
          <h2 className="text-2xl font-bold mt-2">320</h2>
        </div>
        <div className="bg-white shadow-xl shadow-primary/5 rounded-xl p-5">
          <p className="text-gray-500">Pending Orders</p>
          <h2 className="text-2xl font-bold mt-2">18</h2>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow-xl shadow-primary/5 rounded-xl p-5">
        <p className="text-gray-500 mb-4">Sales Overview</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={staticData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
