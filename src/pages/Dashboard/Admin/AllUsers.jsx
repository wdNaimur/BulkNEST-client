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
    Inactive: "bg-base-100 text-secondary/80",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-6">All Users</h1>

      <div className="bg-base-200 shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-primary text-base-100">
            <tr>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                User ID
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">Name</th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Email
              </th>
              <th className="py-3 px-4 border-b border-b-secondary/10">Role</th>
              <th className="py-3 px-4 border-b border-b-secondary/10">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-base-100">
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {user.id}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {user.email}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  {user.role}
                </td>
                <td className="py-3 px-4 border-b border-b-secondary/10">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[user.status] ||
                      "bg-base-100 text-secondary/80"
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
