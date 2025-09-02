import React from "react";
import { NavLink } from "react-router-dom"; // ✅ Use NavLink for active route highlighting

// 🔹 Centralized Navigation Links for Easy Management
const navLinks = [
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact Us" },
];

function Navbar() {
  return (
    // 🔹 Navbar container with Tailwind styling
    <div className="navbar shadow bg-base-100">
      
      {/* 🔹 LEFT SECTION: Brand Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* 🔹 Dropdown for mobile view (hamburger menu) */}
        <div className="dropdown">
          {/* 🔹 Mobile Menu Button (Hamburger Icon) */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* 🔹 Dropdown Menu Items (Visible on Small Screens) */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Brand Logo (Always Visible) */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          AI Resume Maker
        </NavLink>
      </div>

      {/* 🔹 CENTER SECTION: Navigation Links (Visible on Large Screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 RIGHT SECTION: Login Button */}
      <div className="navbar-end">
        <NavLink to="/login" className="btn">
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
