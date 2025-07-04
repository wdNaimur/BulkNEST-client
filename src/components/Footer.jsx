import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AuthContext } from "../AuthContexts/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const links = !user
    ? [
        { path: "/", label: "Home" },
        { path: "/categories", label: "Categories" },
      ]
    : [
        { path: "/", label: "Home" },
        { path: "/categories", label: "Categories" },
        { path: "/allProduct", label: "All Products" },
        { path: "/addProduct", label: "Add Product" },
        { path: "/myProduct", label: "My Product" },
      ];

  return (
    <footer className="relative footer footer-center footer-horizontal text-secondary bg-base-100 pt-10 -space-y-4 overflow-hidden">
      {/* Green radial glow background */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-[#0D9488] opacity-20 blur-3xl rounded-full pointer-events-none z-0"></div>

      {/* Company Info */}
      <aside className="z-10">
        <Link to="/" className="flex items-center justify-center gap-2 mb-1">
          <img className="h-6 object-contain" src="/favicon.png" alt="Logo" />
          <span className="font-bold text-3xl font-outfit">BulkNEST</span>
        </Link>
        <p className="max-w-[90%] opacity-70 px-4 text-center">
          Powering Global Wholesale. One Marketplace. Infinite Supply.
        </p>
      </aside>

      {/* Navigation Links */}
      <nav className="z-10">
        <ul className="flex flex-row flex-wrap items-center justify-center px-6 gap-4">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className="hover:text-primary transition-all duration-200"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Icons */}
      <nav className="z-10">
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/mdnaimurwd"
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-primary transition-all hover:scale-125 hover:-translate-y-1"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://github.com/wdNaimur"
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-primary transition-all hover:scale-125 hover:-translate-y-1"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://x.com/WdNaimur"
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-primary transition-all hover:scale-125 hover:-translate-y-1"
          >
            <FaSquareXTwitter size={24} />
          </a>
        </div>
      </nav>

      {/* Footer Bottom Text */}
      <p className="border-b-[#0D9488] border-b-6 pb-2 w-full py-1 z-10">
        <span className="opacity-60">
          © {new Date().getFullYear()} BulkNEST — Designed & Developed by Md.
          Naimur Rahman
        </span>
      </p>
    </footer>
  );
};

export default Footer;
