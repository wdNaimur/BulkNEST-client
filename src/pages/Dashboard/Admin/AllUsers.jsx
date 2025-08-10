import React from "react";

const AllUsers = () => {
  // Sample static user data
  const users = [
    {
      id: "USR001",
      name: "Md. Naimur Rahman",
      email: "web.naimurrahman@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: "USR002",
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      role: "Seller",
      status: "Inactive",
    },
    {
      id: "USR003",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: "USR004",
      name: "Fatima Begum",
      email: "fatima.begum@example.com",
      role: "Seller",
      status: "Pending",
    },
  ];

  // Function to get badge color based on status
  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Role</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{user.id}</td>
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.role}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[user.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
