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
import DashboardHeading from "../../../components/common/DashboardHeading";

const AdminOverview = () => {
  // Static data for admin overview chart (e.g., new users per month)
  const userGrowthData = [
    { month: "Jan", users: 50 },
    { month: "Feb", users: 75 },
    { month: "Mar", users: 60 },
    { month: "Apr", users: 90 },
    { month: "May", users: 120 },
    { month: "Jun", users: 110 },
    { month: "Jul", users: 130 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <DashboardHeading title={`Dashboard Overview`} />
      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 shadow rounded-xl p-5">
          <p className="text-secondary/60">Total Users</p>
          <h2 className="text-2xl font-bold mt-2">2,350</h2>
        </div>
        <div className="bg-base-200 shadow rounded-xl p-5">
          <p className="text-secondary/60">Total Sellers</p>
          <h2 className="text-2xl font-bold mt-2">520</h2>
        </div>
        <div className="bg-base-200 shadow rounded-xl p-5">
          <p className="text-secondary/60">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">12,780</h2>
        </div>
        <div className="bg-base-200 shadow rounded-xl p-5">
          <p className="text-secondary/60">Pending Approvals</p>
          <h2 className="text-2xl font-bold mt-2">34</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-base-200 shadow rounded-xl p-5">
        <p className="text-secondary/60 mb-4">User Growth (Monthly)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8B5CF6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
