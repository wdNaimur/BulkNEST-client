import React, { use } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContexts/AuthContext";

const Profile = ({ user }) => {
  const { userSignOut } = use(AuthContext);
  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Successfully logged out!");
      })
      .catch((error) => {
        toast.error("Failed to Logout");
      });
  };
  return (
    <div>
      <div className="dropdown dropdown-end flex gap-2">
        <div className="relative flex items-center justify-center gap-2 group">
          <div className="group-hover:block hidden w-62 transition-all ease-linear rounded-box z-1   absolute top-1 right-11 text-center  bg-secondary/10 backdrop-blur-md border border-base-100/20 rounded-xl py-4 px-6">
            <span className="flex items-center justify-center">
              <img
                className="rounded-full w-20 h-20 object-cover"
                alt="profile"
                src={`${
                  user.photoURL
                    ? user.photoURL
                    : "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
                }`}
              />
            </span>
            <p className="font-medium py-2">
              {user?.displayName ? user.displayName : "User"}
            </p>
            <button className="btn btn-primary text-base-100">
              View Profile
            </button>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle avatar shadow-none hover:shadow-none hover:scale-105 transition-all ease-linear "
          >
            <div className="w-10 rounded-full border-2 border-primary relative shadow-none hover:shadow-none">
              <span>
                <img
                  alt="profile"
                  src={`${
                    user.photoURL
                      ? user.photoURL
                      : "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
                  }`}
                />
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-secondary btn text-base-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
