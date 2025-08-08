import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

const Profile = ({ user }) => {
  const { userSignOut } = React.useContext(AuthContext);
  const [showCard, setShowCard] = useState(false);

  const handleSignOut = () => {
    userSignOut()
      .then(() => toast.success("Successfully logged out!"))
      .catch(() => toast.error("Failed to Logout"));
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      originX: 2,
      originY: -2,
      borderRadius: "20%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      originX: 1,
      originY: 2,
      borderRadius: "2%",
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      originX: 2,
      originY: -2,
      borderRadius: "40%",
    },
  };

  return (
    <div>
      <div className="dropdown dropdown-end flex gap-2 items-center relative">
        {/* Avatar with mouse events */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle avatar shadow-none hover:scale-105 transition-transform"
          onMouseEnter={() => setShowCard(true)}
          onMouseLeave={() => setShowCard(false)}
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
        </div>

        {/* Animated Hover Reveal Panel */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              key="profile-card"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 z-10 bg-secondary/10 backdrop-blur-md border border-base-100/20 rounded-box px-6 py-4 w-64 shadow-xl pointer-events-none"
            >
              <div className="flex justify-center">
                <img
                  className="rounded-full w-20 h-20 object-cover"
                  alt="profile"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
                  }
                />
              </div>
              <p className="font-medium text-center py-2">
                {user?.displayName || "User"}
              </p>
              <button className="btn btn-primary text-base-100 w-full">
                View Profile
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="bg-secondary btn text-base-100 hidden sm:inline-flex"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
