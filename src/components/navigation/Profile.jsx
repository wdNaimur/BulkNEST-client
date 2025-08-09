import React from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const Profile = ({ user }) => {
  const { userSignOut } = React.useContext(AuthContext);

  const handleSignOut = () => {
    userSignOut()
      .then(() => toast.success("Successfully logged out!"))
      .catch(() => toast.error("Failed to Logout"));
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        {/* Avatar with mouse events */}
        <Link
          to={`/dashboard/profile`}
          className="btn btn-circle avatar shadow-none border-none"
        >
          <div className="w-10 rounded-full border-2 border-primary overflow-hidden">
            <img
              alt="profile"
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
              }
            />
          </div>
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="bg-secondary btn text-base-100 hidden sm:inline-flex border-none shadow-none"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
