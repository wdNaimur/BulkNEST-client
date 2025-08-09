import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlinePlusCircle,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";

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
      {
        name: "Overview",
        path: "/dashboard",
        end: true,
        icon: <HiOutlineHome size={20} />,
      },
      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <HiOutlineUser size={20} />,
      },
      {
        name: "Order History",
        path: "/dashboard/order-history",
        icon: <HiOutlineClock size={20} />,
      },
    ];
  } else if (role === "admin") {
    navLinks = [
      {
        name: "Overview",
        path: "/dashboard",
        end: true,
        icon: <HiOutlineHome size={20} />,
      },
      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <HiOutlineUser size={20} />,
      },
      {
        name: "All Users",
        path: "/dashboard/manage-users",
        icon: <HiOutlineUsers size={20} />,
      },
      {
        name: "All Products",
        path: "/dashboard/all-products",
        icon: <HiOutlineCube size={20} />,
      },
    ];
  } else if (role === "seller") {
    navLinks = [
      {
        name: "Overview",
        path: "/dashboard",
        end: true,
        icon: <HiOutlineHome size={20} />,
      },
      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <HiOutlineUser size={20} />,
      },
      {
        name: "My Products",
        path: "/dashboard/my-products",
        icon: <HiOutlineCube size={20} />,
      },
      {
        name: "Add Product",
        path: "/dashboard/add-product",
        icon: <HiOutlinePlusCircle size={20} />,
      },
      {
        name: "Orders",
        path: "/dashboard/orders",
        icon: <HiOutlineShoppingBag className="ms-0.5" size={20} />,
      },
    ];
  }
  // Add exit link for all roles
  navLinks.push({
    name: "Exit Dashboard",
    path: "/",
    icon: <HiOutlineLogout className="ms-1" size={20} />,
  });

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
        {navLinks.map(({ name, path, end, icon }, idx) => (
          <NavLink
            key={idx}
            to={path}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:bg-primary/60 px-2 py-2 rounded flex items-center gap-2 ${
                isActive ? "bg-primary/90 text-base-100 font-semibold" : ""
              }`
            }
          >
            <span>{icon}</span> <span>{name}</span>
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
