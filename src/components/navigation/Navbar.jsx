import React, { useContext, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import Profile from "./Profile";
import { IoCartOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const handleNavClick = () => {
    const drawer = document.getElementById("my-drawer-2");
    if (drawer) drawer.checked = false;
  };

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("SignOut Successfully");
        handleNavClick();
      })
      .catch((error) => {
        toast.error(`${error.errorCode}`);
      });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    const checkbox = document.querySelector(".theme-controller");

    if (checkbox) checkbox.checked = isDark;
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, []);

  const handleThemeToggle = (e) => {
    const isDark = e.target.checked;
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const links = !user
    ? [
        { path: "/", label: "Home" },
        { path: "/categories", label: "Categories" },
        { path: "/allProduct", label: "All products" },
        { path: "/about-us", label: "About Us" },
        { path: "/contact", label: "Contact" },
      ]
    : [
        { path: "/", label: "Home" },
        { path: "/categories", label: "Categories" },
        { path: "/allProduct", label: "All products" },
        { path: "/Dashboard", label: "Dashboard" },
        { path: "/addProduct", label: "Add product" },
        { path: "/myProduct", label: "My products" },
        { path: "/about-us", label: "About Us" },
        { path: "/contact", label: "Contact" },
      ];

  const navLinks = links.map((link) => (
    <li key={link.path}>
      <NavLink
        className="hover:bg-transparent hover:text-primary/80 px-2 active:bg-transparent"
        to={link.path}
        onClick={handleNavClick}
      >
        {link.label}
      </NavLink>
    </li>
  ));

  return (
    <nav className="fixed bg-base-100/60 top-0 left-0 w-full z-50 my-auto p-0 font-outfit backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="navbar border-none text-primary lg:px-4 px-2">
          <div className="navbar-start">
            <div className="drawer lg:hidden block w-fit">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-2">
                  <span className="text-secondary text-3xl cursor-pointer">
                    <GiHamburgerMenu />
                  </span>
                </label>
              </div>
              <div className="drawer-side backdrop-blur-[2px] transition-all ease-linear">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-0.5">
                  <div className="pb-2 border-b-2 border-dashed border-primary/40 mb-2">
                    <Link to="/" onClick={handleNavClick}>
                      <div className="flex items-center justify-center">
                        <span className="font-bold text-3xl font-outfit">
                          BulkNEST
                        </span>
                        <img
                          className="h-6 object-contain"
                          src="/favicon.png"
                          alt="Logo"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center flex-col">
                    {navLinks}
                    <div className="mt-4">
                      {user ? (
                        <button
                          onClick={handleSignOut}
                          className="btn btn-secondary text-base-100 btn-wide"
                        >
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          onClick={handleNavClick}
                          to="/signIn"
                          className="btn btn-primary text-white btn-wide"
                        >
                          Sign In
                        </Link>
                      )}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
            <Link
              className="text-4xl text-primary font-outfit font-bold lg:px-0 px-2"
              to="/"
            >
              BulkNEST
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div className="navbar-end flex gap-2">
            <div className="flex items-center gap-2">
              <label
                data-tooltip-id="theme-change"
                className="swap swap-rotate"
              >
                <input
                  type="checkbox"
                  className="theme-controller"
                  onChange={handleThemeToggle}
                />

                {/* Sun Icon */}
                <svg
                  className="swap-off h-9 w-9 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* Moon Icon */}
                <svg
                  className="swap-on h-9 w-9 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              <ReactTooltip
                id="theme-change"
                place="top-start"
                content="Switch Theme"
              />
              <Link
                data-tooltip-id="view-cart"
                to="/cart"
                className="cursor-pointer hover:scale-105 active:scale-95 ease-in-out"
              >
                <ReactTooltip
                  id="view-cart"
                  place="top-start"
                  content="View Cart"
                />
                <IoCartOutline className="text-4xl mr-2" />
              </Link>
            </div>
            <div>
              {user ? (
                <Profile user={user} />
              ) : (
                <Link className="hidden sm:inline-flex" to="/signIn">
                  <button className="btn btn-primary text-white">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
