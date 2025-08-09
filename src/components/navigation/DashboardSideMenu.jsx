import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";

const DashboardSideMenu = ({ handleNavClick }) => {
  const [role, isRoleLoading] = useRole();
  const { userSignOut } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Successfully logged out!");
        navigate("/");
        handleNavClick();
      })
      .catch(() => {
        toast.error("Failed to Logout");
      });
  };
  if (isRoleLoading) {
    return <Loader />;
  }
  let navLinks = [];

  if (role === "customer") {
    navLinks = [
      { name: "Overview", path: "/dashboard", end: true },
      { name: "Profile", path: "/dashboard/profile" },
      { name: "My Orders", path: "/dashboard/my-orders" },
    ];
  } else if (role === "admin") {
    navLinks = [
      { name: "Overview", path: "/dashboard", end: true },
      { name: "Profile", path: "/dashboard/profile" },
      { name: "All Users", path: "/dashboard/manage-users" },
      {
        name: "All Products",
        path: "/dashboard/all-products",
      },
    ];
  } else if (role === "seller") {
    navLinks = [
      { name: "Overview", path: "/dashboard", end: true },
      { name: "Profile", path: "/dashboard/profile" },
      { name: "My Products", path: "/dashboard/my-products" },
    ];
  }

  // Add exit link for all roles
  navLinks.push({ name: "Exit Dashboard", path: "/" });

  return (
    <menu className="w-96 h-screen bg-base-200 text-secondary p-6 flex flex-col shadow-xl shadow-primary/5 fixed top-0 left-0 overflow-y-auto">
      <div className="flex justify-center pb-2 border-b-4 border-dashed border-primary/40 mb-2">
        <button>
          <Link to="/" className="flex items-center justify-center gap-2 mb-1">
            <img className="h-6 object-contain" src="/favicon.png" alt="Logo" />
            <span className="font-bold text-3xl font-outfit">BulkNEST</span>
          </Link>
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {navLinks.map(({ name, path, end }, idx) => (
          <NavLink
            key={idx}
            to={path}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:bg-primary/60 px-3 py-2 rounded ${
                isActive ? "bg-primary/90 text-base-100 font-semibold" : ""
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-16">
        <button
          onClick={handleSignOut}
          className="w-full bg-secondary hover:bg-primary/100 text-base-100 font-semibold py-2 rounded transition-all duration-200 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </menu>
  );
};

export default DashboardSideMenu;
